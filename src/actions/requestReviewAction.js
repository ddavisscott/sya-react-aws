import {REQUEST_REVIEW} from './types';

export function requestReviewAction(idate,isourceKey,iartistName,iartTitle,iurl,idescript,iuserSub) {
    return function(dispatch) {
        dispatch({
            type:REQUEST_REVIEW,
            date:idate,
            sourceKey:isourceKey,
            artistName:iartistName,
            artTitle:iartTitle,
            url:iurl,
            descript:idescript,
            userSub:iuserSub
        })
    }
}