// src/firebase/init.js

// Importaciones modulares de la v9: Importa la función de inicialización principal
import { initializeApp } from "firebase/app";

// Importa las funciones específicas para CADA servicio
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBzX3SFrI5ka_kV1kj7wv2x-dX75ys6fI8",
    authDomain: "netlify-4522d.firebaseapp.com",
    projectId: "netlify-4522d",
    storageBucket: "netlify-4522d.firebasestorage.app",
    messagingSenderId: "423183328845",
    appId: "1:423183328845:web:343ab5bc92134e777a9e04",
};

// 1. Inicializa la aplicación
// La función initializeApp devuelve la instancia de la app.
const app = initializeApp(firebaseConfig);

// 2. Obtiene los servicios de la instancia de la app
// Ya no se necesita el chequeo if (!firebase.apps.length)
const auth = getAuth(app);
const db = getFirestore(app);

// 3. Exporta los servicios
export { auth, db, app }; 
// Exportamos 'app' por si se necesita para algo más, pero 'auth' y 'db' son los importantes.