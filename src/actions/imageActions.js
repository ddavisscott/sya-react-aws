import {SELECT_IMAGE} from './types';

export function selectImage(image) {
    console.log("action called")
    return function(dispatch) {
        dispatch({
            type:SELECT_IMAGE,
            payload: image
        })
    }
}

/*
export const selectImage = (image) => dispatch => {
    dispatch({
        type: SELECT_IMAGE,
        payload: image
    })
}
*/

