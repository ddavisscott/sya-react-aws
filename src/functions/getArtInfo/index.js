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
    let artists = [];

    //----------------------------------------------------------------
    // getArtById
    const userRef = firestore.collection('art');

    // From user collection reference
    userRef.get().then(artList => {
        // If empty, display message
        if (artList.empty) {
            console.log('No matching documents.');
            return;
        }

        // Print each document item from user collection and print id and data object
        artList.forEach(artDoc => {
            let art = artDoc.data();
            if (art.artist_id === userId) {
				if (art.deleted === false) {
                    var fullArtData = {
                        docId: artDoc.id,
                        art: art
                    };
                    artists.push(fullArtData);
				}
            }
        });
        callback(null, artists);
    }).catch(error => {
        callback(error, null);
    });
}
