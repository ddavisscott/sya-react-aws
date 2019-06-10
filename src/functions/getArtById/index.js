var firebase = require('firebase'); 
 
exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;  //<---Important
    
    // SYA app Firebase config object
	
      if(firebase.apps.length == 0) {   // <---Important!!! In lambda, it will cause double initialization.
        firebase.initializeApp(config);
    }

    const firestore = firebase.firestore();

    // Given userId, return list of art
    let userId = event.userId;

    // Have list of download urls to return back from function
    let artUrls = [];

    //----------------------------------------------------------------
    // getArtById
    const userRef = firestore.collection('art').where('artist_id', '==', userId);
	
	// Within each art under artistId
	userRef.get().then(artList =>{
		artList.forEach(artDoc => {
			let art = artDoc.data();
			console.log('checking pic: ' + art.url);
			// If not deleted
			if((art.delete !== null) && (art.delete !== true)) {
				// Get all art fields
				artUrls.push({
					url: art.url,
					art_title: art.art_title,
					artId: artDoc.id,
					id: art.artist_id,
					artist_name: art.artist_name,
					description: art.description,
					categories: art.categories
				});
			}
		});
		callback(null, artUrls);
	}).catch(error => {
		console.log(error);
		callback(null, artUrls);
	});
}
