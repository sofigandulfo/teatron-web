import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import "../styles/Login-Register.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [resetEmail, setResetEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoggedIn(true);
      setSuccessMessage("Inicio de sesión exitoso.");
      setError(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión. Por favor, verifica tu email y contraseña.");
      setSuccessMessage(null);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setLoggedIn(true);
      setSuccessMessage("Inicio de sesión con Google exitoso.");
      setError(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError("Error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.");
      setSuccessMessage(null);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccessMessage("Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.");
      setError(null);
      setResetEmail("");
    } catch (error) {
      console.error(error);
      setError("Error al enviar el correo de recuperación. Por favor, verifica tu email e intenta nuevamente.");
      setSuccessMessage(null);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      setSuccessMessage("Sesión cerrada correctamente.");
      setError(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError("Error al cerrar sesión. Por favor, inténtalo de nuevo más tarde.");
      setSuccessMessage(null);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="container">
      {loggedIn ? (
        <>
          <h1 className="title-signin">INICIO DE SESIÓN</h1>
          <p className="logged-in-message">¡Has iniciado sesión correctamente!</p>
          <button className="button-form" onClick={handleSignOut}>
            CERRAR SESIÓN
          </button>
        </>
      ) : (
        <>
          <h1 className="title-signin">INICIAR SESIÓN</h1>
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
          <p onClick={() => setResetEmail(email)} className="forgot-password">
            OLVIDASTE LA CONTRASEÑA?
          </p>
          {resetEmail && (
            <div className="reset-email-container">
              <input
                className="input-form"
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Email"
              />
              <button className="button-form" onClick={handleForgotPassword}>
                Enviar Correo de Recuperación
              </button>
            </div>
          )}
          <button className="button-form" onClick={handleSignIn}>
            INICIAR SESIÓN
          </button>
          <div onClick={handleSignInWithGoogle} className="google-signin-button">
            <img
              src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
              alt="Google Logo"
              className="google-logo"
            />
            <span>Iniciar sesión con Google</span>
          </div>
          <p className="no-account">
            No tienes cuenta? <NavLink className='link-registro' to="/registro">Regístrate</NavLink>
          </p>
        </>
      )}
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

export default SignIn;
