import {REPLY_SUBMISSION} from './types';

export function replySubmissionAction(idate,iartistName,iartTitle,iurl,idescript,ibusinessID,ireviewID,ireply, ireviewed) {
    return function(dispatch) {
        dispatch({
            type:REPLY_SUBMISSION,
            date:idate,
            artistName:iartistName,
            artTitle:iartTitle,
            url:iurl,
            descript:idescript,
            businessID:ibusinessID,
            reviewID: ireviewID,
            reply:    ireply,
            reviewed: ireviewed,
        })
    }
}