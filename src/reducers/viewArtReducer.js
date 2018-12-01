import {VIEW_ART} from '../actions/types';

const initialState = {
    artTitle: "",
    artistName: "",
    url: null,
    descript: "",
}

export default function(state = initialState, action) {
    switch(action.type) {
        case VIEW_ART:
            return {
                ...state,
                artistName:action.artistName,
                artTitle:action.artTitle,
                url:action.url,
                descript:action.descript,         
            }
        default:
            return state;
    }
}