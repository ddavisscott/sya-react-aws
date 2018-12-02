const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    // AWS Lambda code that querys all of an artist users artwork from DynamoDB
    var params = {
        TableName: "artworkTable",
        KeyConditionExpression: "userSub = :u",
        ExpressionAttributeValues: {
            ":u": event.user
        }
    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.log("error 1");
            callback(err);
        } else {
            callback(null,data);
        }
    });
};
