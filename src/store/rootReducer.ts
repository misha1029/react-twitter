import { combineReducers } from "redux";
import { tweetsReduser } from "./ducks/tweets/reducer";


export const rootReducer = combineReducers({
    tweets: tweetsReduser,
})