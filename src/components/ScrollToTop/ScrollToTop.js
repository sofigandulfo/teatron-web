import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Hacer scroll suave al principio de la página
    scroll.scrollToTop({
      duration: 500,  // Duración de la animación en milisegundos
      smooth: 'easeInOutQuart'  // Curva de aceleración de la animación
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;