import {REQUEST_REVIEW} from '../actions/types';
import {REQUEST_BUSINESS} from '../actions/types';

const initialState = {
    date:'',
    sourceKey:'',
    artistName:'',
    artTitle:'',
    url:'',
    descript:'',
    userSub:'',
    businessName:'',
    businessEmail:'',
    businessID:'',
    businessSubheader:'',
    businessTheGood:'',
    businessIMG:'',
    businessAddNotes:'',
}

export default function(state = initialState, action) {
    switch(action.type) {
        case REQUEST_REVIEW:
            return {
                ...state,
                date:action.date,
                sourceKey:action.sourceKey,
                artistName:action.artistName,
                artTitle:action.artTitle,
                url:action.url,
                descript:action.descript,
                userSub:action.userSub            
            }
        case REQUEST_BUSINESS:
            return {
                ...state,
                businessName:action.businessName,
                businessEmail:action.businessEmail,
                businessID:action.businessID,
                businessSubheader:action.businessSubheader,
                businessTheGood:action.businessTheGood,
                businessIMG:action.businessIMG,
                businessAddNotes:action.businessAddNotes
            }
        default:
            return state;
    }
}