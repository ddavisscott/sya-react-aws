import { DASHBOARD_IMAGES } from "./types";

export function dashBoardImageAction(imagess) {
  return function(dispatch) {
    dispatch({
      type: DASHBOARD_IMAGES,
      images: imagess
    });
  };
}
