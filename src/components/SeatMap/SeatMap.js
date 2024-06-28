import { Snackbar, Alert } from "@mui/material";
import {useState, useEffect} from 'react';
import "../../styles/Reservation.css";

function SeatMap({ rows, columns, onSeatChange, reservedSeats, maxSelectableSeats = 3 }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  // Definir las etiquetas de las filas de A a K
  const rowLabels = "ABCDEFGHIJK".split("");

  const toggleSeat = (row, col) => {
    const seatId = `${row}${col}`;
    let newSelectedSeats;

    if (selectedSeats.includes(seatId)) {
      newSelectedSeats = selectedSeats.filter((seat) => seat !== seatId);
    } else {
      if (selectedSeats.length >= maxSelectableSeats) {
        setAlertMessage(`No puedes seleccionar más de ${maxSelectableSeats} asientos.`);
        return;
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }

    setSelectedSeats(newSelectedSeats);
    onSeatChange(newSelectedSeats);
  };

  useEffect(() => {
    setSelectedSeats([]); // Reiniciar la selección cuando cambien las reservas
  }, [reservedSeats]);

  const handleAlertClose = () => {
    setAlertMessage("");
  };

  return (
    <>
      <h1 className="seat-map-header">ESCENARIO</h1>
      <div className="seat-map">
        {rowLabels.map((rowLabel, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            <div className="seat-label">{rowLabel}</div>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const seatId = `${rowLabel}${colIndex + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              const isOccupied = reservedSeats.includes(seatId); // Verifica si el asiento está reservado
              return (
                <div
                  key={colIndex}
                  className={`seat ${isSelected ? "selected" : ""} ${isOccupied ? "unavailable" : ""} ${
                    colIndex === 5 ? "spacer" : ""
                  }`}
                  onClick={() => !isOccupied && toggleSeat(rowLabel, colIndex + 1)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
            <div className="seat-label">{rowLabel}</div>
          </div>
        ))}
      </div>
      <div className="seat-legend">
        <div className="seat seat-1 selected"></div>
        <div className="seat seat-2 available"></div>
        <div className="seat seat-3 unavailable"></div>

        <div className="seat-info seat-4 selected">TUS ASIENTOS</div>
        <div className="seat-info seat-5 available">DISPONIBLE</div>
        <div className="seat-info seat-6 unavailable">NO DISPONIBLE</div>
      </div>
      <Snackbar
        open={Boolean(alertMessage)}
        autoHideDuration={6000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleAlertClose} severity="warning" sx={{ width: "100%" }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default SeatMap;