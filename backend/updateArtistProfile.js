const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

// user to update is given by a querystring parameter.
exports.handler = (event, context, callback) =>{
  //data holds all values passed into the body of the http request
  var input = JSON.parse(event.body);
  
  //user's sub value. this is the primary key to the respective user profile table.
  var key = event.queryStringParameters.key;

  var role = input.role;   //artist or business

  var instagramLink = 'https://www.instagram.com/';
  var facebookLink = 'https://www.facebook.com/';
  var tumblrLink = 'https://www.tumblr.com/';
  var twitterLink = 'https://www.twitter.com/';

  //format for updating values in a table
  var params = {
    TableName: role,
    Key:{
      "userID": key,
    },
    UpdateExpression: "set #I = :a, #FB = :b, #T = :c, #TW = :d, #A = :e, #AN = :f",
    ExpressionAttributeNames:{

    },
    ExpressionAttributeValues:{

    }
  }

  
  //check each of the fields and only use the values in them if they aren't null, undefined, 
  // or empty strings.
  if(input.instagram !== null && input.instagram !== undefined ){
    instagramLink = instagramLink + input.instagram;
    //exprString = exprString + "instagram = :i, ";
    params.ExpressionAttributeNames["#I"] = 'instagram';
    params.ExpressionAttributeValues[":a"] = instagramLink;
  }

  if(input.facebook !== null && input.facebook !== undefined){
    facebookLink = facebookLink + input.facebook;
    //exprString = exprString + "info.facebookLink = :f, ";
    params.ExpressionAttributeNames["#FB"] = 'facebook';
    params.ExpressionAttributeValues[":b"] = facebookLink;
  }

  if(input.tumblr !== null && input.tumblr !== undefined){
    tumblrLink = tumblrLink + input.tumblr;
    //exprString = exprString + "info.tumblrLink = :t, ";
    params.ExpressionAttributeNames['#T'] = 'tumblr';
    params.ExpressionAttributeValues[":c"] = tumblrLink;
  }

  if(input.twitter !== null && input.twitter !== undefined){
    twitterLink = twitterLink + input.twitter;
    //exprString = exprString + "info.twitterLink = :w, ";
    params.ExpressionAttributeNames["#TW"] = 'twitter';
    params.ExpressionAttributeValues[":d"] = twitterLink;
  }

  if(input.about !== null && input.about !== undefined){
    //exprString = exprString + "info.about = :a, ";
    params.ExpressionAttributeNames["#A"] = 'about';
    params.ExpressionAttributeValues[":e"] = input.about;
  }

  if(input.additionalNotes !== null && input.addtionalNotes !== undefined){
    //exprString = exprString + "info.additionalNotes = :n, ";
    params.ExpressionAttributeNames["#AN"] = 'additionalNotes';
    params.ExpressionAttributeValues[":f"] = input.additionalNotes;
  }

  docClient.update(params, function(err,data){
    if(err){
      console.log(err);
      callback(err);
    }
    else{
      callback(null, data)
    }
  });

  
}