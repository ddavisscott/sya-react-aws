import {REQUEST_REVIEW} from '../actions/types';

const initialState = {
    date:'',
    sourceKey:'',
    artistName:'',
    artTitle:'',
    url:'',
    descript:'',
    userSub:''
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
        default:
            return state;
    }
}