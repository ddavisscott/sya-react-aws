import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  image: null
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
  /** 
   * This compose function is used for testing the store using a google extension to see 
   * the stores contents as it updates. Only use in google chrome if the extension is on.
   *  ******* WILL NOT WORK WITH SAFARI  ********
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  */
);
export default store;
