import {VIEW_IMAGE} from '../actions/types';

const initialState = {
    imageInfo: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case VIEW_IMAGE:
            return {
                ...state,
                imageInfo: action.payload
            }
        default:
            return state;
    }
}