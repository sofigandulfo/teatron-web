import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import "../styles/Login-Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Registrar al usuario
      await createUserWithEmailAndPassword(auth, email, password);

      // Iniciar sesión automáticamente después del registro
      await signInWithEmailAndPassword(auth, email, password);

      // Redirigir al usuario a la página principal
      navigate('/');

      // Mostrar mensaje de éxito
      setSuccessMessage("Registro exitoso. ¡Bienvenido!");
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al registrarse. Por favor, verifica tu email y contraseña.");
      setSuccessMessage(null);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');

      setSuccessMessage("Registro con Google exitoso. ¡Bienvenido!");
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Error al registrarse con Google. Por favor, inténtalo de nuevo más tarde.");
      setSuccessMessage(null);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="container">
      <h1 className="title-register">REGISTRARSE</h1>
      <input
        className="input-form"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="input-form password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="button-form" onClick={handleRegister}>REGISTRARSE</button>
      <div onClick={handleRegisterWithGoogle} className="google-signin-button">
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
          alt="Google Logo"
          className="google-logo"
        />
        <span>Registrarse con Google</span>
      </div>
      <p className="no-account">
        Ya tienes una cuenta? <NavLink className="link-registro" to="/login">Iniciar sesión</NavLink>
      </p>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Register;
