const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

/*
Update the reviewRequest Database with the response given by the business,
along with the following fields:

NewFields: reply, radios, repliedDate,
UpdateFields: replied
*/
exports.handler = (event, context, callback) => {
  var input = JSON.parse(event.body);
  var businessID = input.businessID; 
  var reviewID = input.reviewID; 

  var params = {
    TableName: 'reviewRequest',
    Key: {
      "businessID": businessID,
      "reviewID": reviewID
    },
    UpdateExpression: "set #Reply = :a, #Radios = :b, #RDate = :c, #Replied = :d", 
    ExpressionAttributeNames: {
      "#Reply": 'reply',
      "#Radios": 'radios',
      "#RDate": 'repliedDate',
      "#Replied": 'replied'
    },
    ExpressionAttributeValues:{
      ":a": input.reply,       //the response
      ":b": input.radios,      //accepted or declined?
      ":c": input.repliedDate, //date response was made
      ":d": input.replied       //true, since they've replied.
    }
  };

  docClient.update(params, function(err, data){
    if(err){
      console.log(err);
      callback(err);
    }
    else{
      console.log(data);
      callback(null, data);
    }
  });

};
