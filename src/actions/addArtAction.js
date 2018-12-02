import {ADD_ART} from './types';

export function addArtAction(inputImage) {
    return function(dispatch) {
        dispatch({
            type:ADD_ART,
            image:inputImage
        })
    }
}