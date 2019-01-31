      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCrFeBUOky6zicH5Pgfvj_ssYWxm7cgUFI",
        authDomain: "amfirebase-2e1f3.firebaseapp.com",
        databaseURL: "https://amfirebase-2e1f3.firebaseio.com",
        projectId: "amfirebase-2e1f3",
        storageBucket: "amfirebase-2e1f3.appspot.com",
        messagingSenderId: "153473692758"
      };

      firebase.initializeApp(config);
      var database = firebase.database();
      var today = moment();
      console.log(today);
    
      $("#submit").on("click", function() {
        console.log("Clicked");
        var name = $("#trainNameInput").val().trim();
        var destin = $("#destinationInput").val().trim();
        var start = $("#timeInput").val().trim();
        var freq = $("#frequencyInput").val().trim();


        // var today = moment();
    // var month = today.diff(moment(start, "MM/DD/YYYY"), "month");
    // var $key = database.key;

    database.ref().push({
        Train: {
        name: name,
        destin: destin,
        start: start,
        freq: freq
        }
         });
        
    });