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

      var currentTime = moment();
    //   var nowTime = moment(moment()).format("HH:mm");
    var timeIs = moment(currentTime).format("hh:mm");
    console.log(timeIs);

      var nhrs12 = moment(currentTime).format("hh");
      var nhrs24 = moment(currentTime).format("HH");
      console.log("HRS are "+nhrs12+" and "+nhrs24);
      if (nhrs12 === nhrs24) {
          var ntd = "AM";
      } else {
          var ntd = "PM"
      }
      $("#timenow").append("<b>Current time is "+timeIs+" "+ntd+"</b>");

      // ON.Click function to add a new train
      $("#submit").on("click", function() {
        var name = $("#trainNameInput").val().trim();
        var destin = $("#destinationInput").val().trim();
        var start = $("#timeInput").val().trim();
        var freq = $("#frequencyInput").val().trim();

    // Push data into a "Train" database
    var dbRef = database.ref().child("Trains");
    dbRef.push().set({
    name: name,
    destin: destin,
    start: start,
    freq: freq
});
});



    // Pull data from "Train" database
    database.ref().child("Trains").on("child_added", function(snapshot) {
            // Decaring a var db to hold an object
        var db = snapshot.val();

        // Time each train starts
        var startTime = db.start;
        var frequency = db.freq;

        console.log("=========================");
        console.log(db.name+" train starts at "+startTime);
       
    
        // First Time (pushed back 1 year to make sure it comes before current time)
        var startTimeFormat = moment(startTime, "HH:mm").subtract(1, "years");

        // Current Time
        // console.log(currentTime);
        // console.log("Now is "+moment(currentTime).format("hh:mm"));
      
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
        var hrs12 = moment(nextTrain).format("hh");
        var hrs24 = moment(nextTrain).format("HH");
        console.log("HRS are "+hrs12+" and "+hrs24);
        if (hrs12 === hrs24) {
            var dt = "AM";
        } else {
            var dt = "PM"
        }




        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var $row = $("<tr>");
        $row.append("<td>"+db.name+"</td>");
        $row.append("<td>"+db.destin+"</td>");
        $row.append("<td class=\"text-center\">"+db.freq+"</td>");
        $row.append("<td class=\"text-center\">"+nextTime+" "+dt+"</td>");
        $row.append("<td class=\"text-center\">"+minTill+"</td>");
        $("#train-table-rows").append($row);
    })