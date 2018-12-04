import { REQUEST_BUSINESS } from "./types";

export function requestBusinessAction(
  ibusinessName,
  ibusinessEmail,
  ibusinessID,
  ibusinessSubheader,
  ibusinessTheGood,
  ibusinessIMG,
  ibusinessAddNotes
) {
  return function(dispatch) {
    dispatch({
      type: REQUEST_BUSINESS,
      businessName: ibusinessName,
      businessEmail: ibusinessEmail,
      businessID: ibusinessID,
      businessSubheader: ibusinessSubheader,
      businessTheGood: ibusinessTheGood,
      businessIMG: ibusinessIMG,
      businessAddNotes: ibusinessAddNotes
    });
  };
}
