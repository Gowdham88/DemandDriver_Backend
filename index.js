var http = require('http');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
var request = require('request');
var geodist = require('geodist');
var FCM = require('fcm-node');
var gcm = require("node-gcm");



// var API_KEY = "..."; // Your Firebase Cloud Messaging Server API key

var requests;
var driverToken;
var User_Token;

// //Integrating firebase


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





// var biggest = citiesRef.where('population', '>', 2500000).orderBy('population').limit(2);

// function requestID() {

//       var ref = db.ref("Current_booking").limitToLast(1);
//         ref.on("child_added", function(addsnapshot) {
//             var dbref = db.ref("Current_booking");
//             dbref.orderByChild("Current_booking").equalTo(addsnapshot.val().postid).once("value",function(extsnapshot) {

//       // var postmessagearray = []
//       // var postimagearray   = []
//       // var basketidarray    = []
//       // var primaryid        = []
//       // var position         =  0
//             requests = doc.data().Request;
//             driverToken = doc.data().driverToken;
           

//         extsnapshot.forEach(function (snapshot) {

//         // console.log(snapshot.val().postmessage);
//         // lat.push(snapshot.val().postmessage);
//         // long.push(snapshot.val().postimage);
//         // UID.push(snapshot.val().UID);
//             console.log(requests);
//             console.log(driverToken);
           
//         }

//      }

//   });

// }
// requestID();




function approve() {
	// body...

// 	var query = db.collection('Current_booking').where('Request', '==', 'Approved').limit(1);

// var observer = query.onSnapshot(querySnapshot => {
//   console.log(`Received query snapshot of size ${querySnapshot.size}`);

//   // console.log(doc.data());
//   // ...
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });
var citiesRef = db.collection('Current_booking');
var allCities = citiesRef.get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
			requests = doc.data().Request;
            driverToken = doc.data().driverToken;
            User_Token = doc.data().User_Token;

				 var query = db.collection('Current_booking').where('Request', '==', 'Approved').limit(1);

			     var observer = query.onSnapshot(querySnapshot => {
			     console.log(`Received query snapshot of size ${querySnapshot.size}`);

			  // console.log(doc.data());
			  let message = new gcm.Message({
											    notification: {
											        title: "Hello World! ",
											        icon: "your_icon_name",
											        body: "Here is a notification's body."
											    },
											});

						sender.sendNoRetry(message, ["driverToken", "User_Token"], (err, response) => {
						    if (err) console.error(err);
						    else console.log(response);
						});
					  // ...
					}, err => {
					  console.log(`Encountered error: ${err}`);
					});
					console.log(requests);
		            console.log(driverToken);
		            console.log(User_Token);


      		});
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });





}

approve();


    
    var serverKey = 'AAAAWIq0QYs:APA91bHTABWxpp5S2nrbbvuYJdKE0UxZBkZSjstsCOKfK7gJDkBnrZM8YeCon8lsrA_GufGruCdCFenF33B3eWhBcFsu-ARLQqA8AeO-3tj9su772SuEVCRA4zjLN3Qx6TSXmU32qLmn' //put the generated private key path here    
    
    var fcm = new FCM(serverKey)
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'ddeFFa4dBPlQ:APA91bF7hTjsSkk-l6fLaI939W0ISe2olO18OjCUZu4N9URr9QKW4xXBIyWyC1L9Vui1cawGkFaSV1M2yDG4ASJyeCtrwGyal0GmIgdciZeGVmNSUnvyddTLUPAxQlAsjpAHTJy4Lwqt', 
        collapse_key: 'green',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
            
        },
        // data: {
          
        // }
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'eAVBmjTdMm8:APA91bG8n-ODPCUY6BjgE-KHZn-ULGEkMhjbKdhAkArQYEhj7QLanLDNOuIZRnwKCg5hdvItn8IoVGpe7Scxo3ehTgfMjls72QJsSZAtqF8FENOwXX-EMpQh4orLpdCietHu1xEjXol8',
            my_another_key: 'ddeFFa4dBPlQ:APA91bF7hTjsSkk-l6fLaI939W0ISe2olO18OjCUZu4N9URr9QKW4xXBIyWyC1L9Vui1cawGkFaSV1M2yDG4ASJyeCtrwGyal0GmIgdciZeGVmNSUnvyddTLUPAxQlAsjpAHTJy4Lwqt'
             
        }

   }

















