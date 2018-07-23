'use strict';
var request = require('request');
//var urllib = require('urllib');
var Alexa = require("alexa-sdk");
var http = require("http");
var https = require("https");



// For detailed tutorial on how to making a Alexa skill,
// please visit us at http://alexa.design/build


exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    //skill-id
    alexa.appId = 'amzn1.ask.skill.fc654c34-567a-4059-a7d1-c98c8bc4bb98';
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        //ask="Welcome to Team. What would you like to know?";
        //reprompt= "What would you like to know?";
        //this.emit(':ask', ask, reprompt);
        this.emit('SayHello');
    },
    'Unhandled' : function() {
        this.response.speak("Sorry, I didn't get that. You can try: 'alexa, hello world'" +
            " or 'alexa, ask hello world my name is awesome Aaron'");
            this.emit(':responseReady');

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
    'GetValueFactIntent': function () {

            const theNumber = this.event.request.intent.slots.valNumber.value;
            var myRequest = parseInt(theNumber);
            const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`;
            
            request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                console.log('error:', error); // Print the error if one occurred
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('body:', body); // Print the body
    
                const theFact = json;                  
                const speechOutput = "Ticket number "+`${theFact.number}`+" has status "+`${theFact.status_id}`;
                /*
                if (speechOutput == 1) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Opened");
                     this.emit(':responseReady');
                 } else if (speechOutput == 2) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Resolved");
                     this.emit(':responseReady');
                 } else if (speechOutput == 3) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Closed");
                     this.emit(':responseReady');
                 }    
                 else if (speechOutput == 4) {
                    this.response.speak("Your Ticket number "+`${theFact.number}`+" Archived");
                    this.emit(':responseReady');
                } 
                else if (speechOutput == 5) {
                    this.response.speak("Your Ticket number "+`${theFact.number}`+" Deleted");
                    this.emit(':responseReady');
                }   
                */
               // this.response.cardRenderer(SKILL_NAME, theFact);
                this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
                this.emit(':responseReady');
            });
    },
    'GetNumberIntent': function () {

        //const ticket = 2;
        //const theNumber = 299740;
        const theNumber = this.event.request.intent.slots.getNumber.value;
           //var myRequest = String(theNumber);  
           //var myRequest = parseInt(theNumber);
           console.log('value:', theNumber); // Print the user value
           const url = 'http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/?fields=status_id&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254&filter=number='+theNumber;
            //const url = 'http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket?&format-json&filter=number='+myRequest+'&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254';
            console.log('url:', url);
            // const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`;
                request.get(url, (error, response, body) => {
                   let json = JSON.parse(body);
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the body
        
                    const theFact = json;  
                    const ticket = theFact.resource[0].number; 
                    const speechOutput = theFact.resource[0].status_id;
                    
                     if (speechOutput == 1) {
                     this.response.speak("Your Ticket number "+`${ticket}`+" Opened");
                     this.emit(':responseReady');
                 } else if (speechOutput == 2) {
                     this.response.speak("Your Ticket number "+`${ticket}`+" Resolved");
                     this.emit(':responseReady');
                 } else if (speechOutput == 3) {
                     this.response.speak("Your Ticket number "+`${ticket}`+" Closed");
                     this.emit(':responseReady');
                 }    
                 else if (speechOutput == 4) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" Archived");
                    this.emit(':responseReady');
                } 
                else if (speechOutput == 5) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" Deleted");
                    this.emit(':responseReady');
                }
                    
                    
                //this.response.cardRenderer(SKILL_NAME, theFact);
                    //this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
                    //this.emit(':responseReady');
                });
           
    },
    'SayHello': function () {
        let self=this;
        //let value = 5;
        let value = self.event.request.intent.slots.number.value;
        var myRequest = parseInt(value);
     
        var options = {
            
          host: 'ft-everkool82.oraclecloud2.dreamfactory.com',
          port: 80,
          method: 'GET',
          path: `/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`,
          json: true
        }

        var req = http.request(options, res => {
            res.setEncoding('utf8');
            var returnData = "";

            res.on('data', chunk => {
                returnData = returnData + chunk;
            });

            res.on('end', () => {
            
              var result = JSON.parse(returnData);

        /*
              if (speechOutput == 1) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Opened");
                     this.emit(':responseReady');
                 } else if (speechOutput == 2) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Resolved");
                     this.emit(':responseReady');
                 } else if (speechOutput == 3) {
                     this.response.speak("Your Ticket number "+`${theFact.number}`+" Closed");
                     this.emit(':responseReady');
                 }    
                 else if (speechOutput == 4) {
                    this.response.speak("Your Ticket number "+`${theFact.number}`+" Archived");
                    this.emit(':responseReady');
                } 
                else if (speechOutput == 5) {
                    this.response.speak("Your Ticket number "+`${theFact.number}`+" Deleted");
                    this.emit(':responseReady');
                }
            */
           //callback(result);
              self.response.speak(` ${result.number} `+ " Would you like another ticket?").listen("Would you like another ticket?");;
              self.emit(':responseReady');
            });

        });
        req.end();

    },

/* 
    'Get': function () {
        const theNumber = this.event.request.intent.slots.getNumber.value;
                var myRequest = parseInt(theNumber);
                const url = 'http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket?&filter=number='+myRequest+'&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254';
                request.get(url, (error, response, body) => {
                    let json = JSON.parse(body);
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the body
        
                    const theFact = json;                  
                    const speechOutput = `${theFact}`;
                // this.response.cardRenderer(SKILL_NAME, theFact);
                    this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
                    this.emit(':responseReady');
                });
},

*/

    'GetNumber': function () {

        const theNumber = this.event.request.intent.slots.theNumber.value;
        console.log('value:', theNumber); // Print the user value
        //const url = 'http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/?fields=status_id&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254&filter=number='+theNumber;
        const url = 'http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket?&format-json&filter=number='+theNumber+'&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254';
         console.log('url:', url);
         // const url = `http://ft-everkool82.oraclecloud2.dreamfactory.com/api/v2/demo31OST/_table/akash_ticket/${myRequest}?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254`;
             request.get(url, (error, response, body) => {
                let json = JSON.parse(body);
                 console.log('error:', error); // Print the error if one occurred
                 console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                 console.log('body:', body); // Print the body
     
                 const theFact = json;   
                 const speechOutput = theFact.resource[0].status_id;
                 const ticket = theFact.resource[0].number;
                 
                 if (speechOutput == 1) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" Opened");
                    this.emit(':responseReady');
                } else if (speechOutput == 2) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" Resolved");
                    this.emit(':responseReady');
                } else if (speechOutput == 3) {
                    this.response.speak("Your Ticket number "+`${ticket}`+" Closed");
                    this.emit(':responseReady');
                }    
                else if (speechOutput == 4) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" Archived");
                   this.emit(':responseReady');
               } 
               else if (speechOutput == 5) {
                   this.response.speak("Your Ticket number "+`${ticket}`+" Deleted");
                   this.emit(':responseReady');
               }
                
             //this.response.cardRenderer(SKILL_NAME, theFact);
                this.response.speak(speechOutput + " Would you like another ticket?").listen("Would you like another ticket?");
                 this.emit(':responseReady');
             });
        
},

/*
'GetValue': function (query, callback) {
    var options = {
          host: 'ft-everkool82.oraclecloud2.dreamfactory.com',
          port: 80,
          path: '/api/v2/demo31OST/_table/akash_ticket/'+ encodeURIComponent(query)+'?&format-json&api_key=30ee4b81b5435f37a6673717ef639cdc92a03ecc1090d95e76b9e78991928254',
          method: 'GET',
          json: true
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
            //console.log(responseString);
            //callback(responseString);
            var data = JSON.parse(responseString);
            this.response.speak(` ${data.number} `);
            this.emit(`${data.number}`);
        });

    });
    req.end();

   
},

 */

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
            this.emit(':responseReady');

    }
};
