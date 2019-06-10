var firebase = require('firebase'); 
 
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  //<---Important
    
    // SYA app Firebase config object
	
      if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
        firebase.initializeApp(config);
    }

    const firestore = firebase.firestore();

    // Have list of download urls to return back from function
    let artistRev = [];

    // Business ID parameter
	let artistId = event.artistId;

    //----------------------------------------------------------------
    // getBusinessReviews
	// Reference to all responded reviews under current artist Id
    const reviewRef = firestore.collection('review_requests').where('art.artist_id', '==', artistId).where('replied','==',true);
	
	// Fetch documents collection
	reviewRef.get().then(reviewList => {
		// Each document, add particular fields to object in array
		reviewList.forEach(reviewDoc => {
			let review = reviewDoc.data();
			console.log('checking pic: ' + review.art.url);
			// Get all fields relating to blog responses
			artistRev.push({ 
				url: review.art.url,
				title: review.art.art_title,
				id: reviewDoc.id,
				description: review.art.description,
				response: review.submission_response.response,
				business: review.businessId.business_name
			});
		})
		callback(null, artistRev);
	}).catch(error => {
		console.log(error);
		callback(null, artistRev);
	});
}
