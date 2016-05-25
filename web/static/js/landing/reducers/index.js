import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import visitors from "./visitors";
import auth from "./auth";
import ws from "./ws";


export default combineReducers({
  routing: routerReducer,
  visitors,
  auth,
  ws
});