import { useNavigate } from 'react-router-dom';

function ReservationButton({ projectName, className }) {
  
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate(`/reservar/${projectName}`);
  };

  return (
    <button onClick={handleReservationClick} className={className}>
      RESERVA TU ASIENTO
    </button>
  );
}


export default ReservationButton;
