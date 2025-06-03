import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../slice/todos/todosSlice";
import authReducer from "../slice/auth/authSlice";

//store
const store = configureStore({
  reducer: {
    todos: todosReducer,
    auth: authReducer,

  },
});

export default store;