import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../slice/todos/todosSlice";
import authReducer from "../slice/auth/authSlice";
import calendarReducer from "../slice/calendar/calendarSlice";
//store
const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,
    calendar: calendarReducer
  },
});

export default store;