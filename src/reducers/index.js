import {combineReducers} from 'redux';
import imageReducer from './imageReducer';
import dashBoardReducer from './dashBoardReducer';
import viewImageReducer from './viewImageReducer';
export default combineReducers( {
    imageReducer,
    dashBoardReducer,
    viewImageReducer,
});