$(document).ready(function() {
    //FIREBASE=========================================================
    var config = {
        apiKey: "AIzaSyBkpbSikCF2mmB9cxPIZFsJ_jTg-CPVuIY",
        authDomain: "classwork-f3a92.firebaseapp.com",
        databaseURL: "https://classwork-f3a92.firebaseio.com",
        projectId: "classwork-f3a92",
        storageBucket: "classwork-f3a92.appspot.com",
        messagingSenderId: "467753365825"
    };
    firebase.initializeApp(config);
    //VARIABLES=========================================================
    var database = firebase.database();


    // CAPTURE BUTTON CLICK
    $("#submit").on("click", function() {

        //VALUES FOR EACH VARIABLE IN HTML
        var name = $('#nameInput').val().trim();
        var dest = $('#destInput').val().trim();
        var time = $('#timeInput').val().trim();
        var freq = $('#freqInput').val().trim();

        // PUSH NEW ENTRY TO FIREBASE
        database.ref().push({
            name: name,
            dest: dest,
            time: time,
            freq: freq,
            timeAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // NO REFRESH
        $("input").val('');
        return false;
    });

    //ON CLICK CHILD FUNCTION
    database.ref().on("child_added", function(childSnapshot) {
            // console.log(childSnapshot.val());
            var name = childSnapshot.val().name;
            var dest = childSnapshot.val().dest;
            var time = childSnapshot.val().time;
            var freq = childSnapshot.val().freq;

            console.log("Name: " + name);
            console.log("Destination: " + dest);
            console.log("Time: " + time);
            console.log("Frequency: " + freq);


            //TABLE DATA=====================================================
            //APPEND TO DISPLAY IN TRAIN TABLE
            $('#currentTime').text(currentTime);
            $('#trainTable').append(
                "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
                "</td><td id='destDisplay'>" + childSnapshot.val().dest +
                "</td><td id='freqDisplay'>" + childSnapshot.val().freq +
                "</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
                "</td><td id='awayDisplay'>" + minsAway + ' minutes until arrival' + "</td></tr>");
        },

        function(errorObject) {
            console.log("Read failed: " + errorObject.code)
        });



}); //END DOCUMENT.READY