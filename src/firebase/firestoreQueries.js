import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

async function obtenerAsientosOcupados(proyectoId) {
    const reservasRef = collection(db, "reservas");
    const q = query(reservasRef, where("proyectoId", "==", proyectoId));
    const querySnapshot = await getDocs(q);

    let asientosOcupados = [];

    querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.selectedSeats && Array.isArray(data.selectedSeats)) {
            asientosOcupados = asientosOcupados.concat(data.selectedSeats);
        } else {
            console.warn(`Documento con ID ${doc.id} tiene datos de asientos inválidos.`);
        }
    });

    return asientosOcupados;
}

export { obtenerAsientosOcupados };