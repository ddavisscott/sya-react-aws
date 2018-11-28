import {SELECT_IMAGE} from '../actions/types';

const initialState = {
    image: null
}

export default function(state = initialState, action) {
    console.log("reducer called");
    switch(action.type) {
        case SELECT_IMAGE:
            console.log("select image reducer called");
            console.log(action.payload);
            return {
                ...state,
                image: action.payload
            }
        default:
            return state;
    }
}