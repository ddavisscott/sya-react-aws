import {REQUEST_REVIEW} from '../actions/types';
import {REQUEST_BUSINESS} from '../actions/types'
import { CardActions } from '@material-ui/core';

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
    businessID:''
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
                businessID:action.businessID
            }
        default:
            return state;
    }
}