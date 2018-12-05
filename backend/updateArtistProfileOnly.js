const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

/*
Updates an artists db information with the information that they entered on the
artist update profile page.
*/
exports.handler = (event, context, callback) =>{
  //input holds all values passed into the body of the http request
  var input = JSON.parse(event.body);
  
  var userID = input.userID;

  //format for updating values in a table
  var params = {
    TableName: 'artist',
    Key:{
      "userID": userID,
    },
    UpdateExpression: "set #I = :a, #FB = :b, #T = :c, #TW = :d",
    ExpressionAttributeNames:{

    },
    ExpressionAttributeValues:{

    }
  };

  //check each of the fields and only use the values in them if they aren't null, undefined, 
  // or empty strings.
  if(input.instagram !== null && input.instagram !== undefined ){
    params.ExpressionAttributeNames["#I"] = 'instagram';
    params.ExpressionAttributeValues[":a"] = input.instagram;
  }

  if(input.facebook !== null && input.facebook !== undefined){
    params.ExpressionAttributeNames["#FB"] = 'facebook';
    params.ExpressionAttributeValues[":b"] = input.facebook;
  }

  if(input.tumblr !== null && input.tumblr !== undefined){
    params.ExpressionAttributeNames['#T'] = 'tumblr';
    params.ExpressionAttributeValues[":c"] = input.tumblr;
  }

  if(input.twitter !== null && input.twitter !== undefined){
    params.ExpressionAttributeNames["#TW"] = 'twitter';
    params.ExpressionAttributeValues[":d"] = input.twitter;
  }

  docClient.update(params, function(err,data){
    if(err){
      console.log(err);
      callback(err);
    }
    else{
      callback(null, data);
    }
  });
};

