var firebase = require('firebase'); 
 
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  //<---Important
    
	// SYA app Firebase config object
	
      if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
        firebase.initializeApp(config);
    }

    const firestore = firebase.firestore();

    // Have list of download urls to return back from function
    let businessRev = [];

    // Business ID parameter
	let businessId = event.businessId;

    //----------------------------------------------------------------
    // getBusinessFields
    const reviewRef = firestore.collection('review_requests');
    const businessReviews = reviewRef.where('businessId.userId', '==', businessId);

    // From user collection reference
    businessReviews.get().then(reviewList => {
        // If empty, display message
        if (reviewList.empty) {
            console.log('No matching documents.');
            return;
        }

        // Print each document item from user collection and print id and data
        reviewList.forEach(reviewDoc => {
            let review = reviewDoc.data();

            // Push this object onto array
            businessRev.push(review.art);
        });
        callback(null, businessRev);
    }).catch(error => {
        callback(error, null);
    });
}
