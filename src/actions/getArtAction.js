import { GET_ART } from "./types";

export function getArtAction(inputImages) {
  return function(dispatch) {
    dispatch({
      type: GET_ART,
      images: inputImages
    });
  };
}
