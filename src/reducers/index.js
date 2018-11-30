import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import requestReviewReducer from './requestReviewReducer';
export default combineReducers( {
    imageReducer,
    requestReviewReducer
});