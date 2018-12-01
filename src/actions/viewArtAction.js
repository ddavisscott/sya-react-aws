import {VIEW_ART} from './types';

export function viewArtAction(iartistName,iartTitle,iurl,idescript) {
    return function(dispatch) {
        dispatch({
            type:VIEW_ART,
            artistName:iartistName,
            artTitle:iartTitle,
            url:iurl,
            descript:idescript,
        })
    }
}