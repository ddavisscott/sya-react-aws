import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import viewArtReducer from './viewArtReducer';
import replySubmissionReducer from './replySubmissionReducer';
import requestReviewReducer from './requestReviewReducer';
import dashBoardReducer from './dashBoardReducer';

export default combineReducers( {
    imageReducer,
    requestReviewReducer,
    viewArtReducer,
    replySubmissionReducer,
    dashBoardReducer,
});