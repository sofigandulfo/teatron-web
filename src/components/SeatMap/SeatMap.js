import { useState } from "react";
import "../../styles/Reservation.css";

function SeatMap({ rows = 8, columns = 10, onSeatChange }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rowLabels = "ABCDEFGH".split("");

  const toggleSeat = (row, col) => {
    const seatId = `${row}${col}`;
    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter((seat) => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(newSelectedSeats);
    onSeatChange(newSelectedSeats);
  };

  return (
    <>
      <h1 className="seat-map-header">ESCENARIO</h1>
      <div className="seat-map">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className="seat-row" key={rowIndex}>
            <div className="seat-label">{rowLabels[rowIndex]}</div>
            {Array.from({ length: columns }).map((_, colIndex) => {
              const seatId = `${rowLabels[rowIndex]}${colIndex + 1}`;
              const isSelected = selectedSeats.includes(seatId);
              return (
                <div
                  key={colIndex}
                  className={`seat ${isSelected ? "selected" : ""} ${
                    colIndex === 5 ? "spacer" : ""
                  }`}
                  onClick={() => toggleSeat(rowLabels[rowIndex], colIndex + 1)}
                >
                  {colIndex + 1}
                </div>
              );
            })}
            <div className="seat-label">{rowLabels[rowIndex]}</div>
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
    </>
  );
}

export default SeatMap;

