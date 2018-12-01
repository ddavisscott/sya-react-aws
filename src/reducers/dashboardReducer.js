import {GET_ART} from '../actions/types';
import {ADD_ART} from '../actions/types';

const initialState = {
    images: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_ART:
            return {
                ...state,
                images:[...state.images, action.image]          
            }
        case GET_ART:
            return {
                ...state,
                images: action.images
            }
        default:
            return state;
    }
}