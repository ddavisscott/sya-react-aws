import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import dashBoardReducer from './dashBoardReducer';
import viewArtReducer from './viewArtReducer';
import replySubmissionReducer from './replySubmissionReducer';
export default combineReducers( {
    imageReducer,
    dashBoardReducer,
    viewArtReducer,
    replySubmissionReducer,
});