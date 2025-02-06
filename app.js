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
    const table = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    // Create table rows
    clients.forEach(client => {
        const row = document.createElement('tr');
        ['Name', 'Description', 'DirectorName'].forEach(col => {
            const td = document.createElement('td');
            td.textContent = client[col];
            row.appendChild(td);
        });
        table.appendChild(row);
    });
}

// Event listener for form submission
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('clientForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            Name: e.target.clientName.value,
            Description: e.target.description.value,
            DirectorName: e.target.directorName.value
        };
        await addClient(data);
    });

    // Display clients on page load
    displayClients();
});

// Fetch data and populate the tables
$(document).ready(async function() {
    var teamsTable = $('#teamsTable').DataTable();
    var clientsTable = $('#clientsTable').DataTable();

    // Populate Teams Table
    const teamsSnapshot = await getDocs(collection(db, "Teams"));
    teamsSnapshot.forEach((doc) => {
        var data = doc.data();
        teamsTable.row.add([
            data.ClientName,
            data.Name,
            data.ManagerName
        ]).draw();
    });

    // Populate Clients Table
    const clientsSnapshot = await getDocs(collection(db, "Clients"));
    clientsSnapshot.forEach((doc) => {
        var data = doc.data();
        clientsTable.row.add([
            data.Name,
            data.Description,
            data.DirectorName
        ]).draw();
    });

    // Populate client dropdown in team form
    const clientsDropdownSnapshot = await getDocs(collection(db, "Clients"));
    clientsDropdownSnapshot.forEach((doc) => {
        var data = doc.data();
        $('#clientID').append(new Option(data.Name, doc.id));
    });

    // Handle team form submission
    $('#teamForm').on('submit', async function(e) {
        e.preventDefault();

        var clientID = $('#clientID').val();
        var clientName = $('#clientID option:selected').text();
        var name = $('#name').val();
        var managerName = $('#managerName').val();

        try {
            const docRef = await addDoc(collection(db, "Teams"), {
                ClientID: clientID,
                ClientName: clientName,
                Name: name,
                ManagerName: managerName
            });
            console.log("Document written with ID: ", docRef.id);
            teamsTable.row.add([
                clientName,
                name,
                managerName
            ]).draw();

            // Clear form and close modal
            $('#teamForm')[0].reset();
            $('#teamModal').modal('hide');
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    });
});
