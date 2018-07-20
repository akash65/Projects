'use strict';
const request = require('request');
var Alexa = require("alexa-sdk");
var http = require("http");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'GetNumberFactIntent': function () {
        this.emit('GetNumber');
    },
    'SayHello': function () {
        //http://api.open-notify.org/astros.json
        var options = {
          host: 'api.open-notify.org',
          port: 80,
          method: 'GET',
          path: '/astros.json'
        }

        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";

            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
              var result = JSON.parse(returnData);

              //callback(result);
              this.response.speak(`Hello there are ${result.people.length} people in space.`);

             this.emit(':responseReady');
            });

        });
        req.end();

    },

    'GetNumber': function () {
        const theNumber = this.event.request.intent.slots.number.value;
        var query = parseInt(theNumber);
        
        httpGet(query,  (theResult) => {
                console.log("sent     : " + query);
                console.log("received : " + theResult);
                const theFact = theResult;
                                
                const speechOutput = theFact;
                this.response.cardRenderer(SKILL_NAME, theFact);
                this.response.speak(speechOutput + " Would you like another fact?").listen("Would you like another fact?");
                this.emit(':responseReady');
            });
            function httpGet(query, callback) {
                var options = {
                    host: 'numbersapi.com',
                    path: '/' + encodeURIComponent(query),
                    method: 'GET',
                };
            
                var req = http.request(options, res => {
                    res.setEncoding('utf8');
                    var responseString = "";
                    
                    //accept incoming data asynchronously
                    res.on('data', chunk => {
                        responseString = responseString + chunk;
                    });
                    
                    //return the data when streaming is complete
                    res.on('end', () => {
                        console.log(responseString);
                        callback(responseString);
                    });
            
                });
                req.end();
    }
    
},

    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        this.response.speak('Hello ' + name)
            .cardRenderer('hello world', 'hello ' + name);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};


'use strict';
const request = require('request');
var Alexa = require("alexa-sdk");
var http = require("http");

// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloWorldIntent': function () {
        this.emit('SayHello');
    },
    'MyNameIsIntent': function () {
        this.emit('SayHelloName');
    },
    'GetNumberFactIntent': function () {
        this.emit('GetNumber');
    },
    'SayHello': function () {
        //http://api.open-notify.org/astros.json
        var options = {
          host: 'api.open-notify.org',
          port: 80,
          method: 'GET',
          path: '/astros.json'
        }

        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";

            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
              var result = JSON.parse(returnData);

              //callback(result);
              this.response.speak(`Hello there are ${result.people.length} people in space.`);

             this.emit(':responseReady');
            });

        });
        req.end();

    },

    'GetNumber': function () {
        const theNumber = this.event.request.intent.slots.theNumber.value;
        //var myRequest = parseInt(theNumber);
        const url = `http://numbersapi.com/${theNumber}`;
        const theFact = url[theNumber];

        
        request.get(url, (error, response, body) => {
            // let json = JSON.parse(body);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the body

            const theFact = body;                  
            const speechOutput = theFact;
            this.response.cardRenderer(SKILL_NAME, theFact);
            this.response.speak(speechOutput + " Would you like another fact?").listen("Would you like another fact?");
            this.emit(':responseReady');
        });
    },

    'SayHelloName': function () {
        var name = this.event.request.intent.slots.name.value;
        this.response.speak('Hello ' + name)
            .cardRenderer('hello world', 'hello ' + name);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent' : function() {
        this.response.speak("You can try: 'alexa, hello world' or 'alexa, ask hello world my" +
            " name is awesome Aaron'");
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent' : function() {
        this.response.speak('Bye');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
    }
};


//example
var mydata = this.event.request.intent.slots.theNumber.value;
//var mydata=29970;
    console.log('mydata:', mydata);
    var responseString = '';
    var mythis = this;
//https.get('**YOURURL**?**yourparameters**&mydata=' + mydata, (res) => {
    https.get('http://numbersapi.com/${mydata}' + mydata, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

  res.on('data', (d) => {
    responseString += d;
  });

  res.on('end', function(res) {
    const speechOutput = responseString;
    console.log('==> Answering: ', speechOutput);
    mythis.emit(':tell', 'The answer is'+speechOutput);
  });
}).on('error', (e) => {
  console.error(e);
});