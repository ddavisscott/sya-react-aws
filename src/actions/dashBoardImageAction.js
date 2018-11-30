import {DASHBOARD_IMAGES} from './types';


export function dashBoardImages(images) {
    console.log("action called")
    return function(dispatch) {
        dispatch({
            type: DASHBOARD_IMAGES,
            payload: images
        })
    }
}