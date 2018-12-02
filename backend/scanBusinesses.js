const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

//AWS Lambda code that scans DynamoDB business table to return list of business users with info
exports.handler = function (e, ctx, callback) {
    
    let scanningParameters = {
        TableName: 'business',
    }
    
    docClient.scan(scanningParameters, function(err, data){
        //permissions
        const headers = {
            "Access-Control-Allow-Origins": "*",
            "Access-Control-Allow-Credentials": true
        };
        if (err) {
            callback(err,null);
        }
        else{
            callback(null, data, headers);
        }
    });
};