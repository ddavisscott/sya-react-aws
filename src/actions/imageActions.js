import { SELECT_IMAGE } from "./types";

export function selectImage(image) {
  return function(dispatch) {
    dispatch({
      type: SELECT_IMAGE,
      payload: image
    });
  };
}
