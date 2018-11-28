const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east'});

// user to update is given by a querystring parameter.
exports.handler = (event, context, callback) =>{
  //data holds all values passed into the body of the http request
  var input = JSON.parse(event.body);
  //key is the users sub value, which is unique and used as the primary key 
  //to the user table.
  var key = event.queryStringParameters.key;

  var role = event.queryStringParameters.role; //artist or business

  var instagramLink = 'https://www.instagram.com/';
  var facebookLink = 'https://www.facebook.com/';
  var tumblrLink = 'https://www.tumblr.com/';
  var twitterLink = 'https://www.twitter.com/';

  //format for updating values in a table
  var exprString = "set ";
  var params = {
    TableName: role,
    Key: key,
    //E: exprString,
    ExpressionAttributeValues:{

    }
  }

  if(input.instagram !== null || input.instagram !== undefined){
    instagramLink = instagramLink + input.instagram;
    //exprString = exprString + "info.instagramLink = :i, ";
    params.ExpressionAttributeValues["instagramLink"] = instagramLink;
  }

  if(input.facebook !== null || input.facebook !== undefined){
    facebookLink = facebookLink + input.facebook;
    //exprString = exprString + "info.facebookLink = :f, ";
    params.ExpressionAttributeValues["facebookLink"] = facebookLink;
  }

  if(input.tumblr !== null || input.tumblr !== undefined){
    tumblrLink = tumblrLink + input.tumblr;
    //exprString = exprString + "info.tumblrLink = :t, ";
    params.ExpressionAttributeValues["tumblrLink"] = tumblrLink;
  }

  if(input.twitter !== null || input.twitter !== undefined){
    twitterLink = twitterLink + input.twitter;
    //exprString = exprString + "info.twitterLink = :w, ";
    params.ExpressionAttributeValues["twitterLink"] = twitterLink;
  }

  if(input.about !== null || input.about !== undefined){
    //exprString = exprString + "info.about = :a, ";
    params.ExpressionAttributeValues["about"] = input.about;
  }

  if(input.additionalNotes !== null || input.addtionalNotes !== undefined){
    //exprString = exprString + "info.additionalNotes = :n, ";
    params.ExpressionAttributeValues["additonalNotes"] = input.additionalNotes;
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