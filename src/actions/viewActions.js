import {VIEW_IMAGE} from './types';

export function selectImage(imageInfo) {
    return function(dispatch) {
        dispatch({
            type:VIEW_IMAGE,
            payload: imageInfo
        })
    }
}

