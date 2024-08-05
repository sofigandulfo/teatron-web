import { useState, useEffect } from "react";

function CountdownDate({ eventTimestamp }) {
  const calculateTimeLeft = () => {
    const difference = eventTimestamp - Math.floor(Date.now() / 1000);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (60 * 60 * 24)),
        hours: Math.floor((difference / (60 * 60)) % 24), 
        minutes: Math.floor((difference / 60) % 60), 
        seconds: Math.floor(difference % 60), 
      }

    }
    else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });
  return (
    <>
      <h2 className="countdown-title">
        PARA EL INICIO DE LA TEATRON FALTAN...
      </h2>
      <p className="countdown countdown-days">
        <span className="countdown-span days">{timeLeft.days}</span> DÍAS
      </p>
      <div className="countdown-div">
        <p className="countdown countdown-hours">
          <span className="countdown-span hours">{timeLeft.hours}</span> HORAS
        </p>
        <p className="countdown countdown-minutes">
          <span className="countdown-span minutes">{timeLeft.minutes}</span> MINUTOS
        </p>
        <p className="countdown countdown-seconds">
          <span className="countdown-span seconds">{timeLeft.seconds}</span> SEGUNDOS
        </p>
      </div>
    </>
  );
}

export default CountdownDate;
