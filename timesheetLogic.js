
  var config = {
    apiKey: "AIzaSyDjvFLiaz8HfA8C3iKs0p4RSJgKoQApyOg",
    authDomain: "employee-directory-b3054.firebaseapp.com",
    databaseURL: "https://employee-directory-b3054.firebaseio.com",
    projectId: "employee-directory-b3054",
    storageBucket: "employee-directory-b3054.appspot.com",
    messagingSenderId: "113602036062"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#add").on("click", function() {

	var trainName = $("#name").val().trim();
	var trainDestination = $("#destination").val().trim();
	var trainFrequency = $("#frequency").val().trim();
	var twentyFourTime = $("#time").val().trim();

	twentyFourTime = twentyFourTime.split(":");
	var trainTime = parseInt(twentyFourTime[0])*60 + parseInt(twentyFourTime[1]);

	database.ref().push({
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	});

}); 


$("#clear").on("click", function() {

	database.ref().remove();

	$("#train-table").html("");

}); 


database.ref().on("value", function(trains) {
	
	trains.forEach(function(child) {

		var name = child.val().name;
		var destination = child.val().destination;
		var frequency = parseInt(child.val().frequency);
		var time = parseInt(child.val().time);

		var now = new Date().getTime();

		now = now - (6*60*60*1000);

		now = now % 86400000;

		now = Math.floor(now / 60000);

		var nowH = Math.floor(now / 60);

		var nowM = now % 60;

		$("#currentTime").html("Generated " + nowH + ":" + nowM + " Central Time.");
		

		var trainIndex = Math.ceil((now - time) / frequency);
		var nextArrival = time + trainIndex*frequency;


		var nextArrivalH = Math.floor(nextArrival / 60);

		var nextArrivalM = nextArrival % 60;

		var minutesAway = nextArrival - now;


		var newRow = $("<tr>");

		$("<td>").append(name).appendTo(newRow);
		$("<td>").append(destination).appendTo(newRow);
		$("<td>").append(frequency).appendTo(newRow);
		$("<td>").append(nextArrivalH + ":" + nextArrivalM).appendTo(newRow);
		$("<td>").append(minutesAway).appendTo(newRow);		

		newRow.appendTo("#train-table");

	});

}); 

