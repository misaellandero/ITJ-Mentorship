// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1NpwCWhX7uwRR3rKUN4x7BIMd1o07MnE",
  authDomain: "mentorship-program-c2226.firebaseapp.com",
  projectId: "mentorship-program-c2226",
  storageBucket: "mentorship-program-c2226.firebasestorage.app",
  messagingSenderId: "67199414597",
  appId: "1:67199414597:web:0ac86055e804559dcd0e2c",
  measurementId: "G-RT9F2DSQRN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a client to Firestore
async function addClient(data) {
  try {
    const docRef = await addDoc(collection(db, 'Clients'), data);
    console.log("Document written with ID: ", docRef.id);
    displayClients(); // Refresh the table after adding a client
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Function to get clients from Firestore
async function getClients() {
  const querySnapshot = await getDocs(collection(db, 'Clients'));
  return querySnapshot.docs.map(doc => doc.data());
}

// Function to display clients in a table
async function displayClients() {
  const clients = await getClients();
  const table = document.getElementById('clientsTable');
  table.innerHTML = '';

  // Create table header
  const headerRow = document.createElement('tr');
  ['name', 'product'].forEach(col => {
    const th = document.createElement('th');
    th.textContent = col;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Create table rows
  clients.forEach(client => {
    const row = document.createElement('tr');
    ['name', 'product'].forEach(col => {
      const td = document.createElement('td');
      td.textContent = client[col];
      row.appendChild(td);
    });
    table.appendChild(row);
  });
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('clientsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: e.target.clientName.value,
      product: e.target.product.value
    };
    addClient(data);
  });

  // Display clients on page load
  displayClients();
}); 