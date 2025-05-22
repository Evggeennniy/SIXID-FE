import { configureStore } from "@reduxjs/toolkit";

import todosReducer from "../slice/todos/todosSlice";

//store
const store = configureStore({
  reducer: {
    todos: todosReducer,

  },
});

export default store;