'use strict';

var express = require('express'); //import express constructor
var app = express(); // custom http framework
var http = require('http').Server(app); //tell noejs to use the express framework instead of default framework
const MessagingResponse = require('twilio').twiml.MessagingResponse;


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


var fs = require('fs'); //filesystem
var indexHtml = fs.readFileSync("./index.html");
var testhtml = fs.readFileSync("./test.html");

var accountSid = 'AC90f1457335a4bfa500cfff640e553a4d'; // Your Account SID from www.twilio.com/console
var authToken = 'c950feb274876de4717a627d7ab531b2';
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);



passport.use(new GoogleStrategy({
  clientID: "1011794453706-3rhlsjcbqft61ijtdb6fqv9k2jhd0vvg.apps.googleusercontent.com",
  clientSecret: "yDoxBLpAHwpq1mXotHx6ieM2",
  callbackURL: "http://127.0.0.1/google/callback"
},function(accessToken,refreshToken,profile,cb) {
  return cb(null, profile);
}));

passport.serializeUser(function(user,done) {
  done(null,user);
}); //cb calls that

passport.deserializeUser(function(user,done) {
  done(null,user);
}); //cb calls that


//no matter request, use function will always get called first
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(request, response) {
  console.log("this is root");
  response.type("text/html");
  response.send(indexHtml);
});

app.get('/google/login', passport.authenticate('google', {scope: ['profile']}));


app.get('/google/callback', passport.authenticate('google', {failureRedirect: '/google/login'}), function(request, response) {

  response.type("text/html"); //plain
  response.send(testhtml);
//response.send("Welcome  " + request.user.name.givenName +"!");
  console.log(JSON.stringify(request.user));
})

app.get('/twilio/sms', function(req,res){
  client.messages.create({
      body: 'High Beam',
      to: '+16616755558',  // Text this number
      from: '+16614413621' // From a valid Twilio number
  }).then((message) => console.log(message.sid)).done();
 console.log("sending message");
});

app.get('/twilio/send', function(req,res){
  client.messages.create({
      body: 'Slow Down. You\'re Tailgating',
      to: '+16616755558',  // Text this number
      from: '+16614413621' // From a valid Twilio number
  }).then((message) => console.log(message.sid)).done();
 console.log("sending message");
});

app.get('/twilio/takepic', function(req,res){
  client.messages.create({
      body: 'GETTFOUT',
      to: '+16616755558',  // Text this number
      from: '+16614413621' // From a valid Twilio number
  }).then((message) => console.log(message.sid)).done();
 console.log("sending message");
});

http.listen(80, function() {
  console.log("starting server on port 80...");
});
