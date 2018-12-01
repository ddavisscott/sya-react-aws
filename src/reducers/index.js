import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import requestReviewReducer from './requestReviewReducer';
import dashBoardReducer from './dashboardReducer.js'
export default combineReducers( {
    imageReducer,
    requestReviewReducer, 
    dashBoardReducer
});