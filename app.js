// Importar funciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1NpwCWhX7uwRR3rKUN4x7BIMd1o07MnE",
  authDomain: "mentorship-program-c2226.firebaseapp.com",
  projectId: "mentorship-program-c2226",
  storageBucket: "mentorship-program-c2226.appspot.com",
  messagingSenderId: "67199414597",
  appId: "1:67199414597:web:0ac86055e804559dcd0e2c",
  measurementId: "G-RT9F2DSQRN"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Guardar datos en Firestore
document.getElementById('saveData').addEventListener('click', async () => {
  try {
    await setDoc(doc(db, "usuarios", "usuario1"), {
      nombre: "Juan Pérez",
      programa: "Desarrollo Web"
    });
    alert("Datos guardados exitosamente");
  } catch (error) {
    console.error("Error al guardar los datos:", error);
  }
});

// Obtener datos de Firestore
document.getElementById('getData').addEventListener('click', async () => {
  try {
    const docRef = doc(db, "usuarios", "usuario1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert(`Datos obtenidos: ${JSON.stringify(docSnap.data())}`);
    } else {
      alert("No se encontraron datos");
    }
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
});