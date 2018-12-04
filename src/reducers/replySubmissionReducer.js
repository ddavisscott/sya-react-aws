import { REPLY_SUBMISSION } from "../actions/types";

const initialState = {
  date: "",
  artistName: "",
  artTitle: "",
  url: "",
  descript: "",
  businessID: "",
  reviewID: "",
  reply: "",
  replied: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REPLY_SUBMISSION:
      return {
        ...state,
        date: action.date,
        artistName: action.artistName,
        artTitle: action.artTitle,
        url: action.url,
        descript: action.descript,
        businessID: action.businessID,
        reviewID: action.reviewID,
        reply: action.reply,
        replied: action.replied
      };
    default:
      return state;
  }
}
