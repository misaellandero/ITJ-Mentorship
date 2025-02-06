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
const db = getFirestore();

// 1. Agregar un Client
async function addClient() {
  await addDoc(collection(db, "Clients"), {
    ClientID: 1,
    Name: "Empresa XYZ",
    Description: "Consultoría de software",
    DirectorName: "Juan Pérez"
  });
}

// 2. Agregar un Team
async function addTeam() {
  await addDoc(collection(db, "Teams"), {
    TeamID: 101,
    ClientID: 1,
    Name: "Equipo Alpha",
    ManagerName: "Laura Gómez"
  });
}

// 3. Agregar un Mentor
async function addMentor() {
  await addDoc(collection(db, "Mentors"), {
    MentorID: 201,
    TeamID: 101,
    FullName: "Carlos Martínez",
    Email: "carlos@example.com",
    Description: "Experto en desarrollo web",
    Picture: "url_de_la_imagen",
    Active: true
  });
}

// Llama las funciones para agregar los datos
addClient();
addTeam();
addMentor();

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


// Obtener y mostrar los mentores en la tabla
async function cargarMentores() {
    const querySnapshot = await getDocs(collection(db, "Mentors"));
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      $('#mentorsTable tbody').append(`
        <tr>
          <td>${data.FullName}</td>
          <td>${data.Email}</td>
          <td>${data.Description}</td>
          <td>${data.Active ? 'Sí' : 'No'}</td>
        </tr>
      `);
    });
  
    // Inicializar DataTables
    $('#mentorsTable').DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
      }
    });
  }
  
  // Cargar la tabla al iniciar
  cargarMentores();

