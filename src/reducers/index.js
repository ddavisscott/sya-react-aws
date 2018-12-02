import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import viewArtReducer from './viewArtReducer';
import replySubmissionReducer from './replySubmissionReducer';
import requestReviewReducer from './requestReviewReducer';
import dashBoardReducer from './dashboardReducer.js'

export default combineReducers( {
    imageReducer,
    requestReviewReducer, 
    dashBoardReducer,
    viewArtReducer,
    replySubmissionReducer,
});