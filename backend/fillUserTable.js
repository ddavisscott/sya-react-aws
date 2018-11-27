/*
This is a cognito based post-confirmation function that is connected to the Cognito
user pool. After a user is CONFIRMED for sign up (in other words, they 
have entered their verification code), this function should be triggered. 

Goal: Take relevant user info from the sign up phase and store it
in the specified DynamoDB table. Place artists in the artist DB and businesses
in the business DB.
*/

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east'});

exports.handler = (event, context, callback) => {
    var date = new Date().toUTCString();
    var role = event.request.userAttributes['custom:role'];

    // user is an artist, insert the attributes provided through sign up
    // include 2 free credits for signing up and set premium credits to 0
    if(role == 'artist'){
        var params = {
            TableName: 'artists',
            Item:{
                "userID": event.request.userAttributes.sub,
                "username": event.userName,
                "email": event.request.userAttributes.email,
                "credits": 0,
                "free_credits": 2,
                "creation_date": date,
            }
        }

        //params.Item["creation_date"] = "";

        docClient.put(params, function(err, data) {
            if(err){
                console.log(err);
                callback(err);
            }
            else{
                console.log(data);
                callback(null, data);
            }
        });
    }

    // user is a business. Insert the attributes provided at sign-up
    // extra information such as an instagram, facebook, tumblr, etc
    else if(role == 'business'){
        var params = {
            TableName: 'business',
            Item:{
                "userID": event.request.userAttributes.sub,
                "business_name": event.userName,
                "email": event.request.userAttributes.email,
                "creation_date": date
            }
        }

        docClient.put(params, function(err, data) {
            if(err){
                console.log(err);
                callback(err);
            }
            else{
                console.log(data);
                callback(null, data);
            }
        });
    }

}
