import {DASHBOARD_IMAGES} from '../actions/types';

const initialState = {
    images: []
}

export default function(state = initialState, action) {
    console.log("reducer called");
    switch(action.type) {
        case DASHBOARD_IMAGES:
            console.log("select dashboard reducer called");
            console.log(action.payload);
            return {
                ...state,
                images: action.payload
            }
        default:
            return state;
    }
}