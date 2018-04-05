var http = require('http');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
var request = require('request');
var geodist = require('geodist')


// var API_KEY = "..."; // Your Firebase Cloud Messaging Server API key


 var lat ;
 var long;
 var UID;
 var address;
 var time;
 var date;
 // var token;
 var distance

 var driverUID;
 var driverphoneNumber;
 var driverToken;
 var driverLat;
 var driverLong;

// //Integrating firebase


var serviceAccount = require("/Users/paramesh/Dropbox/DemandDriver-NodeJS/propane-nomad-707-firebase-adminsdk-bhx9c-18d2b560d5.json");
var refreshToken;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://propane-nomad-707.firebaseio.com",
  projectId: 'propane-nomad-707'

});

var db = admin.firestore();
 console.log("connected to firestore");


 


// // // Google's Firebase Cloud Messaging (FCM)

// var serverKey = 'AAAAWIq0QYs:APA91bHTABWxpp5S2nrbbvuYJdKE0UxZBkZSjstsCOKfK7gJDkBnrZM8YeCon8lsrA_GufGruCdCFenF33B3eWhBcFsu-ARLQqA8AeO-3tj9su772SuEVCRA4zjLN3Qx6TSXmU32qLmn';
// var fcm = new FCM(serverKey);

var registerToken = 'APA91bHTABWxpp5S2nrbbvuYJdKE0UxZBkZSjstsCOKfK7gJDkBnrZM8YeCon8lsrA_GufGruCdCFenF33B3eWhBcFsu-ARLQqA8AeO-3tj9su772SuEVCRA4zjLN3Qx6TSXmU32qLmn';


// function updateServerTimestamp(db) {
//     // Create the object before updating it (racy on first run, oh well)
//     db.collection('objects').doc('some-id').set({});

//     // [START update_with_server_timestamp]
//     // Get the `FieldValue` object
//     var FieldValue = require('firebase-admin').firestore.FieldValue;

//     // Create a document reference
//     var docRef = db.collection('UsersBookingRequest').doc('some-id');

//     // Update the timestamp field with the value from the server
//     var updateTimestamp = docRef.update({
//         timestamp: FieldValue.serverTimestamp()
//     });
//     // [END update_with_server_timestamp]

//     return updateTimestamp.then(res => {
//         console.log('Update: ', res);
//     });
// }

// exports.UsersBookingRequestCreated = functions.firestore
//     .document('UsersBookingRequest/{requestId}')
//     .onCreate((snap, context) => {
    
//     const userBookingRequestData = snap.data();
//     const userBookingRequestId = context.params.requestId;

//     console.log(userBookingRequestId);
    
//     const data = {
//     // Your data



//     }
//     console.log(userBookingRequestId);
//     return admin.firestore().collection('DriversCurrentBookings').doc(userBookingRequestId).set(data);

// });

// exports.UsersBookingRequestCreated = functions.firestore
//     .document('UsersBookingRequest/{requestId}')
//     .onCreate((snap, context) => {
    
//     const userBookingRequestData = snap.data();
//     const userBookingRequestId = context.params.requestId;

    
//     const data = {
//     // Your data

//                      lat: lat,
//                      long: long,
//                      UID: UID,
//                      address: address,
//                      date: date,
//                      time: time
// //                      // token: token



//     }
//     console.log(userBookingRequestId);
//     return admin.firestore().collection('DriversCurrentBookings').doc(userBookingRequestId).set(data);

// });


// func requestID() {

//       var ref = db.ref("UsersBookingRequest").limitToLast(1);
//         ref.on("child_added", function(addsnapshot) {
//             var dbref = db.ref("UsersBookingRequest");
//             dbref.orderByChild("UsersBookingRequest").equalTo(addsnapshot.val().postid).once("value",function(extsnapshot) {

//       // var postmessagearray = []
//       // var postimagearray   = []
//       // var basketidarray    = []
//       // var primaryid        = []
//       // var position         =  0
//             lat = doc.data().Currentlat;
//             long = doc.data().Currentlong;
//             UID = doc.data().UID;
//             // token = doc.data().token;
//             address = doc.data().address;
//             date = doc.data().date;
//             time = doc.data().time;

//         extsnapshot.forEach(function (snapshot) {

//         // console.log(snapshot.val().postmessage);
//         // lat.push(snapshot.val().postmessage);
//         // long.push(snapshot.val().postimage);
//         // UID.push(snapshot.val().UID);
//             console.log(lat);
//             console.log(long);
//             console.log(UID);
//             // console.log(token);
//             console.log(address);
//             console.log(date);
//             console.log(time);
//         }

//     }
//       });

// }
// requestID();

function distance() {


    var cityRef = db.collection('UsersBookingRequest').doc('oiwljZIt0bQKhF9p5cnlMopSual1');
            var getDoc = cityRef.get()
                 .then(doc => {
                     if (!doc.exists) {
                         console.log('No such document!');
                     } else {
                            console.log('Document data:', doc.data());
                            lat = doc.data().Currentlat;
                            long = doc.data().Currentlong;
                            UID = doc.data().UID;
                            // token = doc.data().token;
                            address = doc.data().address;
                            date = doc.data().date;
                            time = doc.data().time;

                            console.log(lat);
                            console.log(long);
                            console.log(UID);
                            // console.log(token);
                            console.log(address);
                            console.log(date);
                            console.log(time);
                       

         var cityRef = db.collection('DriverInActive').doc('oiwljZIt0bQKhF9p5cnlMopSual1');
            var getDoc = cityRef.get()
               .then(doc => {
                     if (!doc.exists) {
                         console.log('No such document!');
                     } else {
                            console.log('Document data:', doc.data());
                            // driverLat = doc.data().Currentlat;
                            // driverLong = doc.data().Currentlong;
                            driverUID = doc.data().driverUID;
                            driverToken = doc.data().driverToken;
                            driverphoneNumber = doc.data().driverphoneNumber;
                            // address = doc.data().address;
                            // date = doc.data().date;
                            // time = doc.data().time;

                            // console.log(driverLat);
                            // console.log(driverLong);
                            console.log('driverphoneNumber::::', driverphoneNumber);
                            console.log('driverUID::::',driverUID);
                            console.log('driverToken::::', driverToken);
                            // console.log(address);
                            // console.log(date);
                            // console.log(time);
                      



                       var dist = geodist({lat: lat, lon: long}, {lat: 33.7489, lon: -84.3881}, {exact: true, unit: 'km'})
                       // geodist(address, osaka, {exact: true, unit: 'km'})  
                       console.log('distancce in km', dist) 



                         var data = {

                              // driverLat:         driverLat,
                              // driverLong:        driverLong,
                              distance:          dist,
                              driverUID:         driverUID,
                              driverphoneNumber: driverphoneNumber,
                              driverToken:       driverToken
                              // UID: UID,
                              // address: address,
                              // date: date,
                              // time: time
                           // token: token

                     
                        };

                    // Add a new document in collection "cities" with ID 'LA'
            var setDoc = db.collection('DriverActive').doc(doc.data().driverUID).set(data);


                }   
            
             })//DriverInactive
           }

        })//userbooking           
        .catch(err => {
             console.log('Error getting document', err);
    });

}

distance();
 


// function userRideRequest(){

// var query = db.collection('UsersBookingRequest').where('state', '==', 'CA');

// var observer = query.onSnapshot(querySnapshot => {
//     console.log(`Received query snapshot of size ${querySnapshot.size}`);
//     // ...
// }, err => {
//     console.log(`Encountered error: ${err}`);
// });

// }

// userRideRequest();


/****************inserting userrequest to drivercurrentbooking*************/

var citiesRef = db.collection('UsersBookingRequest');
var allCities = citiesRef.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            var reqID = doc.data().UID;

            var cityRef = db.collection('UsersBookingRequest').doc(reqID);
            var getDoc = cityRef.get()
                 .then(doc => {
                     if (!doc.exists) {
                         console.log('No such document!');
                     } else {
                            console.log('Document data:', doc.data());
                            lat = doc.data().Currentlat;
                            long = doc.data().Currentlong;
                            UID = doc.data().UID;
                            // token = doc.data().token;
                            address = doc.data().address;
                            date = doc.data().date;
                            time = doc.data().time;

                            console.log(lat);
                            console.log(long);
                            console.log(UID);
                            // console.log(token);
                            console.log(address);
                            console.log(date);
                            console.log(time);

            var data = {

                     lat: lat,
                     long: long,
                     UID: UID,
                     address: address,
                     date: date,
                     time: time
                     // token: token

                     
                        };

                    // Add a new document in collection "cities" with ID 'LA'
            var setDoc = db.collection('DriversCurrentBookings').doc(doc.data().UID).set(data);

        }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });

        })
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });






var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);


var FCM = require('fcm-node')
    
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

    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!")
        } else {
            console.log("Successfully sent with response: ", response)
        }
    })