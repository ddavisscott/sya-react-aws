var firebase = require('firebase'); 
 
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  //<---Important
    
	// SYA app Firebase config object
    
      if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
        firebase.initializeApp(config);
    }

    const firestore = firebase.firestore();

    // Document Id parameter
    let replyDoc = event.docId;
    
    //----------------------------------------------------------------
    // putBusinessReviews
    const reviewRef = firestore.collection('review_requests');
    
	// Update document to include response details
	reviewRef.doc(replyDoc).update({
		replied: true,
		submission_response: {
			response: event.response
        }
    }).then(() => {
		// Successful response
		let success = "Successfully updated doc: " + replyDoc + "!";
		console.log(success);
		callback(null, success);
	}).catch(error => {
		// Error in submitting response
		console.log(error);
		callback(error, null);
	})

}
