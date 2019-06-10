var firebase = require('firebase'); 
 
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  //<---Important
    
    // sya-app database
    // SYA app Firebase config object
	
      if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
        firebase.initializeApp(config);
    }

    const firestore = firebase.firestore();

    //----------------------------------------------------------------
    // getBusinessFields
    const reviewRef = firestore.collection('review_requests');
	
	let credSubmit = (event.credit === "true") ? (true) : (false);

    // Creates new document in user collection under 'Rivest' document id
    reviewRef.add({
		// Basic artwork information
		art: {
			art_title: event.artTitle,
			artist_id: event.artistId,
			description: event.description,
			url: event.url,
		},
		// Submission specific information
		refunded: 0,
		replied: false,
		submitted_on: Date.now(),
		// Business receiving submission
		businessId: {
			business_email: event.businessEmail,
			business_name: event.title,
			userId: event.userId
		},
		// Additional submission details
		artist_email: event.email,
		submitted_with_free_cerdit: credSubmit
		
	}).then(doc => {
        console.log('Added document with ID: ', doc.id);
		let success = doc.id;
        callback(null, success);
    }).catch(error => {
		console.log(error);
        callback(null, error);
    });
}
