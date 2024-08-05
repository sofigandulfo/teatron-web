import {
  collection,
  doc,
  setDoc,
  getDoc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import projectData from "../data/proyectos.json";
import SeatMap from "../components/SeatMap/SeatMap";
import UbicacionIcon from "../assets/icons/Ubicacion";
import "../styles/Reservation.css";
import { Button, CircularProgress, Snackbar } from "@mui/material";
import emailjs from "emailjs-com";
import MuiAlert from "@mui/material/Alert";


const auth = getAuth();
emailjs.init(process.env.REACT_APP_EMAILJS_USER_ID);

function Reservation() {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const proyecto = projectData.find(
    (project) => project.nombre.toString() === projectName
  );

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const savedUrl = sessionStorage.getItem("redirectAfterLogin");
        if (savedUrl) {
          sessionStorage.removeItem("redirectAfterLogin");
          navigate(savedUrl);
        }
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleSeatChange = (newSelectedSeats) => {
    setSelectedSeats(newSelectedSeats);
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleReservation = async () => {
    if (selectedSeats.length === 0) {
      setError("Por favor, seleccione al menos un asiento.");
      return;
    }

    const user = auth.currentUser;
    if (!user || !user.email || !isValidEmail(user.email)) {
      handleLoginRedirect();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const seatsRef = doc(db, "seats", projectName);
      const seatsDoc = await getDoc(seatsRef);
      if (seatsDoc.exists()) {
        const seatsData = seatsDoc.data().asientos;
        const unavailableSeats = selectedSeats.filter(
          (seat) => seatsData[seat] === "reservado"
        );

        if (unavailableSeats.length > 0) {
          setError(
            `Los siguientes asientos ya no están disponibles: ${unavailableSeats.join(
              ", "
            )}`
          );
          setLoading(false);
          return;
        }
      }


      await addDoc(collection(db, "reservations"), {
        userId: user.uid,
        userEmail: user.email,
        projectName: projectName,
        selectedSeats: selectedSeats,
        timestamp: new Date(),
      });


      if (seatsDoc.exists()) {
        const updatedSeats = seatsDoc.data();
        selectedSeats.forEach((seat) => {
          updatedSeats.asientos[seat] = "reservado";
        });
        await updateDoc(seatsRef, updatedSeats);
      } else {
        const newSeats = { asientos: {} };
        selectedSeats.forEach((seat) => {
          newSeats.asientos[seat] = "reservado";
        });
        await setDoc(seatsRef, newSeats);
      }

      const templateParams = {
        to_email: user.email,
        projectName: projectName,
        selected_seats: selectedSeats.join(", "),
        project_time: proyecto.hora,
      };

      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      setSuccessMessage("Reserva confirmada y Email enviado!");
      setSelectedSeats([]);
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      setError(
        "Hubo un error al realizar la reserva. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSelectedSeats([]);
    navigate(-1);
  };

  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const seatsRef = doc(db, "seats", projectName);
        const seatsDoc = await getDoc(seatsRef);

        if (seatsDoc.exists()) {
          const seatsData = seatsDoc.data().asientos;
          const reservedSeats = Object.keys(seatsData).filter(
            (seat) => seatsData[seat] === "reservado"
          );
          setReservedSeats(reservedSeats);
        } else {
          console.log("No hay datos de asientos para este proyecto.");
        }
      } catch (error) {
        console.error("Error al obtener datos de asientos:", error);
      }
    };

    fetchReservedSeats();
    const seatsRef = doc(db, "seats", projectName);
    const unsubscribe = onSnapshot(seatsRef, (snapshot) => {
      const seatsData = snapshot.data()?.asientos || {};
      const reservedSeats = Object.keys(seatsData).filter(
        (seat) => seatsData[seat] === "reservado"
      );
      setReservedSeats(reservedSeats);
    });

    return () => unsubscribe();
  }, [projectName]);

  if (!proyecto) {
    return <div>Proyecto no encontrado</div>;
  }

  let projectImage;
  try {
    projectImage = require(`../assets/img/${proyecto.foto}`);
  } catch (error) {
    projectImage = null;
  }

  const handleLoginRedirect = () => {
    sessionStorage.setItem("redirectAfterLogin", `/reservar/${projectName}`);
    navigate("/login");
    setError("Por favor, inicie sesión para continuar con la reserva.");
  };

  return (
    <>
      <p className="p-info">
        Para seleccionar los asientos, haz click sobre una ubicación disponible.{" "}
        <br />
        Esta pantalla es un indicador de la disposición de las ubicaciones en la
        sala, <br /> y no representa distancias reales.
      </p>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
      <section className="reservation-section">
        <article className="seatmap">
          <SeatMap
            reservedSeats={reservedSeats}
            rows={8}
            columns={10}
            onSeatChange={handleSeatChange}
          />
        </article>
        <article className="project-details-article">
          <div className="project-details-info">
            <div className="project-details">
              <div className="project-header">
                <picture className="project-picture">
                  <img
                    src={projectImage}
                    alt="Proyecto"
                    className="project-image"
                  ></img>
                </picture>
                <div className="project-info">
                  <h2 className="project-name">{proyecto.nombre}</h2>
                  <div className="project-location-info">
                    <UbicacionIcon />
                    <p className="project-espacio">
                      ESEA DE TEATRO NINI MARSHALL <br /> {proyecto.espacio}
                    </p>
                  </div>
                  <p className="project-ubicacion">OLIDEN 1245, MATADEROS</p>
                  <p className="project-fecha">
                    VIERNES 5 JULIO {proyecto.hora}
                  </p>
                </div>
              </div>
              <div className="selected-seat-info">
                <p className="tickets">{selectedSeats.length} ENTRADAS</p>
                <p className="selected-seat">
                  (ASIENTOS: {selectedSeats.join(", ")})
                </p>
              </div>
            </div>
          </div>
          <div className="project-buttons">
            <Button className="btn" onClick={handleCancel}>
              VOLVER
            </Button>
            <Button
              className="btn"
              onClick={auth.currentUser ? handleReservation : handleLoginRedirect}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "SIGUIENTE"}
            </Button>
          </div>
        </article>
      </section>
    </>
  );
}

export default Reservation;