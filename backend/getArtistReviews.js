const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

//AWS Lambda code that querys all of an artist's review requests from DynamoDB
exports.handler = (event, context, callback) => {
    var params = {
        TableName: "reviewRequest",
        IndexName: "artistID-reviewID-index",
        KeyConditionExpression: "artistID = :ID",
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
