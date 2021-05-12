import { combineReducers } from "redux";
import { userReducer } from "./user";
import {  coursesReducer } from './books';
import { courseReducer } from "./book";

export const reducers = combineReducers({
    user: userReducer,
    courses: coursesReducer,
    course:courseReducer
});
