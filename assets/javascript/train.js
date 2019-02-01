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
    var postsRef = database.ref().child("Trains");
  
    postsRef.push().set({
    name: name,
    destin: destin,
    start: start,
    freq: freq
});

    /*
    database.ref().push({
        Train: {
        name: name,
        destin: destin,
        start: start,
        freq: freq
        }
         });
         */
    });


    

    database.ref().on("child_added", function(snapshot) {
    
        // Decaring a var vs to hold an object
        var vs = snapshot.val();

        console.log(vs.start);
    
        console.log(database.ref());
        console.log(snapshot.key, snapshot.val());
        var startTime = vs.start;
        var timeS = moment(startTime, "HH:mm").subtract(1, "years");
        console.log(timeS);
        console.log(vs.dateAdded);
        var $row = $("<tr>");
        $row.append("<td>"+vs.name+"</td>");
        $row.append("<td>"+vs.destin+"</td>");
        $row.append("<td>"+vs.freq+"</td>");
        $row.append("<td>"+vs.start+"</td>");
        $("#train-table-rows").append($row);
     
    })