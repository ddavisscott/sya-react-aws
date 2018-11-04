const aws = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-1'});

import { Storage } from 'aws-amplify';

/*
    The flow of this program is to do the following:

    uploadImage() will take an image and upload it to the S3 bucket

    urlToDB() will take the url from the uploaded image and send it to DynamoDB

    getUrl()
*/

var uploadImage = function(image){
    //maybe use the class S3ImageUpload instead?
    Storage.put('imageName', '--optional--')
        .then (result => console.log(result))
        .catch(err => console.log(err));
    
    
    
};

var urlToDB = function(){

}