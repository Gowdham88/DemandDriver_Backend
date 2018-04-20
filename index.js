var http        = require('http');
const admin     = require('firebase-admin');
const functions = require('firebase-functions');
var request     = require('request');
var geodist     = require('geodist');
var FCM         = require('fcm-node');
var gcm         = require("node-gcm");


// //Integrating firebase

var serverKey = 'AIzaSyD82N473tFuYYXOJh4pNXOZluv3Rj_8QM0';
var fcm       = new FCM(serverKey);

var serviceAccount = require("/Volumes/Drive E/iOS Project/DDBackEnd_NodeJS/propane-nomad-707-firebase-adminsdk-bhx9c-18d2b560d5.json");
var refreshToken;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://propane-nomad-707.firebaseio.com",
  projectId: 'propane-nomad-707'

});

 var db = admin.firestore();
 console.log("connected to firestore");

let sender = new gcm.Sender("AAAAWIq0QYs:APA91bH9NYEHN-qDICk5mGIptA0mg47jkj9Pllv8_cDq6r7uPurh814rz7VH1AmDtcQhQKsyFaV-Yzh0hgIN371wgc8jhtnaMIUslAXafpKjWyuUVmBxx3n0XzXT816S03LsiiWkVsDL");


	function Tokenretrive() {




   			 var query = db.collection('Current_booking').where('Request', '==', 'Approved');

			var observer = query.onSnapshot(querySnapshot => {
			  console.log(`Received query snapshot of size ${querySnapshot.size}`);
			  querySnapshot.docChanges.forEach(snap  => {

			     		console.log(snap.doc.data().Request);
			     		console.log(snap.doc.data().driverToken);
			     		console.log(snap.doc.data().User_Token);
			     		console.log(snap.doc.data().Driver_Phone_number);
			     		console.log(snap.doc.data().Driver_name);
			     		console.log(snap.doc.data().User_name);

			     		var Request             = snap.doc.data().Request
						var driverToken         = snap.doc.data().driverToken
						var User_Token          = snap.doc.data().User_Token
						var Driver_Phone_number = snap.doc.data().Driver_Phone_number
						var Driver_name         = snap.doc.data().Driver_name
						var User_name           = snap.doc.data().User_name

			     		console.log(Request);
			     		console.log(driverToken);
			     		console.log(User_Token);
			     		console.log(Driver_Phone_number);
			     		console.log(Driver_name);
			     		console.log(User_name);

						var Drivertext = "Ride has been booked successfully with ";
						var Drivername = User_name; //user name  here
						var Driverbody = Drivertext + Drivername;

						console.log(Driverbody);

						var Username    = Driver_name; //driver name here
						var DriverPhone = Driver_Phone_number; //Driver phone number here
						var midtext     = ":";
						var Usertext    = "has been assigned for your ride";
						var userBody    = Username + midtext + " " + DriverPhone + " " + Usertext;

						console.log(userBody);

						Pushnotification(driverToken,"Demand Driver", Driverbody);
			     		Pushnotification(User_Token,"Demand Driver", userBody);



			     })
			  
			}, err => {
			  console.log(`Encountered error: ${err}`);
			});

}

Tokenretrive();



function Pushnotification(devicetoken,title,body) {

    // console.log(dates)

    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: devicetoken,

        priority: 'high',
        content_available: true,

        notification: {
            title: title,
            body: body,
            sound : "default",
            badge: "1"
        },

        // data: {  //you can send only notification or only data(or include both)
        //     my_key: dates,
        //     my_another_key: 'my another value'
        // }


    };

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

}

    








