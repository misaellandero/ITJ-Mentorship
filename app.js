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
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Fetch data and populate the table
$(document).ready(function() {
    var table = $('#teamsTable').DataTable();

    db.collection("Teams").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data();
            table.row.add([
                data.ClientName,
                data.Name,
                data.ManagerName
            ]).draw();
        });
    });

     // Populate Clients Table
     db.collection("Clients").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var data = doc.data();
          clientsTable.row.add([
              data.Name,
              data.Description,
              data.DirectorName
          ]).draw();
      });
  });

  // Populate client dropdown in team form
  db.collection("Clients").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var data = doc.data();
          $('#clientID').append(new Option(data.Name, doc.id));
      });
  });


    // Handle form submission
    $('#teamForm').on('submit', function(e) {
        e.preventDefault();

        var clientID = $('#clientID').val();
        var clientName = $('#clientID option:selected').text();
        var name = $('#name').val();
        var managerName = $('#managerName').val();

        db.collection("Teams").add({
            ClientID: clientID,
            ClientName: clientName,
            Name: name,
            ManagerName: managerName
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            table.row.add([
                clientName,
                name,
                managerName
            ]).draw();

            // Clear form and close modal
            $('#teamForm')[0].reset();
            $('#teamModal').modal('hide');
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    });
    
    // Handle client form submission
    $('#clientForm').on('submit', function(e) {
      e.preventDefault();

      var name = $('#clientName').val();
      var description = $('#description').val();
      var directorName = $('#directorName').val();

      db.collection("Clients").add({
          Name: name,
          Description: description,
          DirectorName: directorName
      }).then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          clientsTable.row.add([
              name,
              description,
              directorName
          ]).draw();

          // Clear form and close modal
          $('#clientForm')[0].reset();
          $('#clientModal').modal('hide');
      }).catch((error) => {
          console.error("Error adding document: ", error);
      });
  });
});

