const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east'});

// user to update is given by a querystring parameter.
exports.handler = (event, context, callback) =>{
  //data holds all values passed into the body of the http request
  var data = JSON.parse(event.body);
  //key is the users sub value, which is unique and used as the primary key 
  //to the user table.
  var key = event.queryStringParameters;

  var instagramLink = 'https://www.instagram.com/';
  var facebookLink = 'https://www.facebook.com/';
  var tumblrLink = 'https://www.tumblr.com/';
  var twitterLink = 'https://www.twitter.com/';
  
  var params = {
    TableName: 'artists',
    Key: key,
    ExpressionAttributeValues:{

    }
  }

  if(data.instagram !== null && data.instagram !== undefined){
    instagramLink = instagramLink + data.instagram;

    params.Item["instagramLink"] = instagramLink;
  }

  if(data.facebook !== null && data.facebook !== undefined){
    facebookLink = facebookLink + data.facebook;
    params.Item["facebookLink"] = facebookLink;
  }

  if(data.tumblr !== null && data.tumblr !== undefined){
    tumblrLink = tumblrLink + data.tumblr;
    params.Item["tumblrLink"] = tumblrLink;
  }

  if(data.twitter !== null && data.twitter !== undefined){
    twitterLink = twitterLink + data.twitter;
    params.Item["twitterLink"] = twitterLink;
  }

  
}