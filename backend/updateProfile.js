const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

/*
Updates the business user database with new/old information that the business
has entered on the business update profile page
*/
exports.handler = (event, context, callback) =>{
  //data holds all values passed into the body of the http request
  var input = JSON.parse(event.body);
  
  //user's sub value. this is the primary key to the respective user profile table.
  var userID = input.userID;

  var role = input.role;   //artist or business

  //format for updating values in a table
  var params = {
    TableName: role,
    Key:{
      "userID": userID,
    },
    UpdateExpression: "set #I = :a, #FB = :b, #T = :c, #TW = :d, #A = :e, #AD = :f, "
    + "#WorthKnowing = :g, #Y = :h",
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

  if(input.about !== null && input.about !== undefined){
    params.ExpressionAttributeNames["#A"] = 'about';
    params.ExpressionAttributeValues[":e"] = input.about;
  }

  if(input.additionalNotes !== null && input.additionalNotes !== undefined){
    params.ExpressionAttributeNames["#AD"] = 'additionalNotes';
    params.ExpressionAttributeValues[":f"] = input.additionalNotes;
  }
  
  if(input.worthKnowing !== null && input.worthKnowing !== undefined){
    params.ExpressionAttributeNames["#WorthKnowing"] = 'worthKnowing';
    params.ExpressionAttributeValues[":g"] = input.worthKnowing;
  }
  
  if(input.url !== null && input.url !== undefined){
    params.ExpressionAttributeNames["#Y"] = 'avatar';
    params.ExpressionAttributeValues[":h"] = input.url;
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
