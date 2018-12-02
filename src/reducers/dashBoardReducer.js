import {DASHBOARD_IMAGES} from '../actions/types';

const initialState = {
    images: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case DASHBOARD_IMAGES:
            return {
                ...state,
                images: action.images
            }
        default:
            return state;
    }
}