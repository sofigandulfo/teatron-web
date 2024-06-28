import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyC6S5MvpmE0bRO9b-m7pAgdrqJ3oGIgf0M',
  authDomain:'teatron-2024.firebaseapp.com',
  projectId: 'teatron-2024',
  storageBucket:'teatron-2024.appspot.com',
  messagingSenderId:'427073598822',
  appId: '1:427073598822:web:281f2a4b08278b1045c4a7',
  measurementId: 'G-30CYQBK1J0'
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics, app };
