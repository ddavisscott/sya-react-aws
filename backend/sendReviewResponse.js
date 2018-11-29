const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

/*
Update the reviewRequest Database with the response given by the business,
along with the following fields:

NewFields: response, radios, repliedDate,
UpdateFields: replied, 
*/
exports.handler = (event, context, callback) => {
  var primaryKey = event.queryStringParameters.businessID;
  var requestID = event.queryStringParameters.requestID;

  var input = JSON.parse(event.body);
  var 

  var exprString = 'set ';
  var parse = {
    TableName: 'reviewRequest',
    Key: primaryKey, requestID, //not sure if this is the right syntax
    ExpressionAttributeValues:{

    }
  }

}