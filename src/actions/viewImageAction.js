import {VIEW_IMAGE} from './types';


export function viewImage(image) {
    console.log("action called")
    return function(dispatch) {
        dispatch({
            type: VIEW_IMAGE,
            payload: image
        })
    }
}