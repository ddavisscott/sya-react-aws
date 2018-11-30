import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import dashBoardReducer from './dashBoardReducer';
export default combineReducers( {
    imageReducer,
    dashBoardReducer
});