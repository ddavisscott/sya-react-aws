/*
This is a cognito based post-confirmation function that is connected to the Cognito
user pool. After a user is CONFIRMED for sign up (in other words, they 
have entered their verification code), this function should be triggered. 
  
  Goal: 
  Take relevant user info from the sign up phase and store it
  in the specified DynamoDB table.
  Place artists in the artist DB and businesses in the business DB.
  Give Businesses a default user avatar
  */
  
 const AWS = require('aws-sdk');
 const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
   
 exports.handler = (event, context, callback) => {
   var defaultAvatar = "https://s3.amazonaws.com/myapp-20181030214040-deployment/public/syaDefaultAvatar.png";
   var date = new Date().toUTCString();
   var role = event.request.userAttributes['custom:role'];
     
   // user is an artist, insert the attributes provided through sign up
   // include 2 free credits for signing up and set premium credits to 0
 
   var params = {
     TableName: role,
     Item:{
       "userID": event.request.userAttributes.sub,
       'creationDate': date,
   
     }
   };
   
   if(role == 'artist'){
     params.Item['artistName'] = event.userName;
     params.Item['artistEmail'] = event.request.userAttributes.email;
     params.Item['credits'] = 0;
     params.Item['freeCredits'] = 5;
   }
     
   // user is a business. Insert the attributes provided at sign-up
   if(role == 'business'){
     params.Item['businessName'] = event.userName;
     params.Item['businessEmail'] = event.request.userAttributes.email;
     params.Item['avatar'] = defaultAvatar;
   }
 
   docClient.put(params, function(err, data) {
     if(err){
       console.log(err);
       callback(err);
     }
     else{
       callback(null, data);
     }
   });   
 };
   