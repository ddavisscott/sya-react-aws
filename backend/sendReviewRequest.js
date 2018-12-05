//Equivalent to writeReviewRequestsv2 in Lambda console

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
/*
Takes information from the artist and writes a review request to the 
business that they chose from the list of businesses, provided that 
they have enough credits to make a request.
*/
exports.handler = (event, context, callback) => {
  var data = JSON.parse(event.body);
  var requestDate = new Date().toUTCString();

  //reviewID = uuid of review request
  var reviewID = data.reviewID;
  
  //artist related data
  var artTitle = data.artTitle;
  var artistName = data.artistName;
  var artistID = data.artistID;
  var artistEmail = data.artistEmail;
  var artDescription = data.artDescription;
  var uploadDate = data.uploadDate;
  var url = data.url;
  var artistCredit = data.artistCredit;
  
  //business related data
  var businessName = data.businessName;
  var businessEmail = data.businessEmail;
  var businessID = data.businessID;
  
  var submittedWithFreeCredit = data.submittedWithFreeCredit;

  if(artistCredit > 0 ){
    subtractCredit(artistID, artistCredit);
    var param = { 
      TableName: 'reviewRequest',
      Item:{
        'businessID': businessID, //primary key
        'reviewID': reviewID,    //sort key
        'artistID': artistID,
        'artwork':{
          'artTitle': artTitle,
          'artistID': artistID,
          'artistName': artistName,
          'artistEmail': artistEmail,
          'description': artDescription,
          'url': url,
          'uploadDate': uploadDate
        },
        'business':{
          'businessEmail': businessEmail,
          'businessName': businessName,
        },
        'readByArtist': false,
        'refunded': 0,
        'replied': false,
        'submittedWithFreeCredit': submittedWithFreeCredit, 
        'requestDate': requestDate
      }
    };
    docClient.put(param, function(err, data){
      if(err){
        callback(err);
      }
      else{
        callback(null, data);
      }
    });

  }
  else{
    callback("Not enough credits to submit a request");
  }
};

//get credit amount of the artist making the request
function getUserCredit(userID){
  var artist;
  var params = {
    TableName: 'artist',
    Key: {
      "userID": userID
    }
  };
  docClient.get(params, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      artist = data;
      
    }
  });
  return artist;
}

// subtracts 1 credit from the artists account only if they are 
// elibible to submit the review. In other words, only if they have 
// more than 0 credits to begin with.
function subtractCredit(userID, currentCredit){
  var params = {
    TableName: 'artist',
    Key:{
      "userID": userID
    },
    UpdateExpression: "set #Credit = :c - :x ",
    ExpressionAttributeNames:{
      '#Credit': 'freeCredits'
    },
    ExpressionAttributeValues:{
      ":c": currentCredit,
      ":x": 1
    }
  };

  docClient.update(params, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      console.log("artists credit amount has been updated");
    }
  });
}

