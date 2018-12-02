const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = (event, context, callback) => {
    // AWS Lambda code that querys a single users info from DynamoDB
    var params = {
        TableName: event.userRole,
        KeyConditionExpression: "userID = :ID",
        ExpressionAttributeValues: {
            ":ID": event.ID
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
