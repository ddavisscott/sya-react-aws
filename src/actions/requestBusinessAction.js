import {REQUEST_BUSINESS} from './types';

export function requestBusinessAction(ibusinessName, ibusinessEmail,ibusinessID) {
    return function(dispatch) {
        dispatch({
            type:REQUEST_BUSINESS,
            businessName: ibusinessName,
            businessEmail: ibusinessEmail,
            businessID: ibusinessID
        })
    }
}