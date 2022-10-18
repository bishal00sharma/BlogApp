import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { userauthReducer } from "./userAuth/userAuth.reducer";

const rootReducer = combineReducers({
  userAuth: userauthReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));