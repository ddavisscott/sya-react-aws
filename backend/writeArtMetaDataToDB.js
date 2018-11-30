const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const s3 = new AWS.S3();
exports.handler = (event, context, callback) => {
  var data = JSON.parse(event.body);
  var imageName = data.art_title;
  var artistName = data.artist_name;
  var artistID = data.sub;
  var artDescription = data.descript;
  var uploadDate = data.upload_date;
  var sourceKey = data.image_key; //s3 image key
  var url = "https://s3.amazonaws.com/myapp-20181030214040-deployment/public/" + sourceKey;
  
  
  
  var params = {
    TableName : 'artworkTable',
    Item: {
      "userSub": artistID, //primary key
      "url": url,         //sort key
      "sourceKey": sourceKey, 
      "artTitle": imageName, 
      "artistName": artistName,
      "date": uploadDate,
      "description": artDescription
    }
  };
  docClient.put(params, function(err, data) {
    if (err){
      console.log(err);
      callback(err);
    }
    else{
      console.log(data);
      callback(null,data);
    } 
  });
  
};
