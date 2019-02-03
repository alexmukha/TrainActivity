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
    //   console.log(today);
    
      $("#submit").on("click", function() {
        // console.log("Clicked");
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




    database.ref().child("Trains").on("child_added", function(snapshot) {
    
        // Decaring a var vs to hold an object
        var vs = snapshot.val();

        // Time each train starts
        var startTime = vs.start;
        var frequency = vs.freq;
        console.log("=========================");


        console.log(vs.name+" train starts at "+startTime);
       
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var startTimeFormat = moment(startTime, "HH:mm").subtract(1, "years");
        console.log(startTimeFormat._i);

        // Current Time
        var currentTime = moment();
        console.log(moment(currentTime).format("hh:mm"));

        //  Find difference between now and statTime
        var timeDiff = moment().diff(moment(startTimeFormat), "minutes");
        console.log("Diff " + timeDiff+" min");
        
        // Find remainder
        var remainder = timeDiff % frequency;
        console.log(remainder);

        // Minute Until Train
        var minTill = frequency - remainder;
        console.log("Till " + minTill);       

        // Next train 
        var nextTrain = moment().add(minTill, "minutes");
        var nextTime = moment(nextTrain).format("hh:mm");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        // var vs = ss.val();
        // var ks = snapshot.key;
        // var vs = snapshot.key.val();
        // console.log(vs.start);
    
        // console.log(database.ref().database.ref());
        // console.log(snapshot.key, snapshot.val());
        // var timeS = moment.unix(vs.start).format("YYYY-MM-DD");
        // var timeS = moment.unix(vs.start).format("HH:mm");
        // var startTime = vs.start;
        // var timeS = moment(startTime, "HH:mm").subtract(1, "years");
        // console.log(timeS);
        // console.log(vs.dateAdded);
        var $row = $("<tr>");
        $row.append("<td>"+vs.name+"</td>");
        $row.append("<td>"+vs.destin+"</td>");
        $row.append("<td>"+vs.freq+"</td>");
        $row.append("<td>"+nextTime+"</td>");
        $row.append("<td>"+minTill+"</td>");
        $("#train-table-rows").append($row);
     
    })