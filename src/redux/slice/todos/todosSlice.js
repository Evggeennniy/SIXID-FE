import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import fetchWithAuth from "../../../util/fetchWithAuth";
import { logout, setTokens } from "../auth/authSlice";


const initialState = {
  todosList: [],
  loading: false,
  error: null,
  activeTodoItem: null,
  isOpenTodosOptions: false,
  activeDayTasks: []
}
//getTodos

export const getTodosAction = createAsyncThunk(
  'todos/get',
  async (_, { getState, dispatch, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    try {
      const res = await fetchWithAuth(
        '/api/todos/tasks',
        { method: 'GET' },
        accessToken,
        refreshToken,
        (newAccess) => dispatch(setTokens({ access: newAccess })),
        () => dispatch(logout())
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const changeTodosAction = createAsyncThunk(
  'todos/change',
  async ({ id, data }, { getState, dispatch, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    try {
      const res = await fetchWithAuth(
        `/api/todos/tasks/${id}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        accessToken,
        refreshToken,
        (newAccess) => dispatch(setTokens({ access: newAccess })),
        () => dispatch(logout())
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      const updatedTodo = await res.json();
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const addTodoAction = createAsyncThunk(
  'todos/add',
  async (data, { getState, dispatch, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    try {
      const res = await fetchWithAuth(
        '/api/todos/tasks/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        accessToken,
        refreshToken,
        (newAccess) => dispatch(setTokens({ access: newAccess })),
        () => dispatch(logout())
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      const createdTodo = await res.json();
      return createdTodo;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);

export const deleteTodosAction = createAsyncThunk(
  'todos/delete',
  async (id, { getState, dispatch, rejectWithValue }) => {
    const { accessToken, refreshToken } = getState().auth;

    try {
      const res = await fetchWithAuth(
        `/api/todos/tasks/${id}/`,
        {
          method: 'DELETE',
        },
        accessToken,
        refreshToken,
        (newAccess) => dispatch(setTokens({ access: newAccess })),
        () => dispatch(logout())
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      return id; // Return deleted todo ID
    } catch (error) {
      return rejectWithValue(error.message || 'Network error');
    }
  }
);
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setActiveTodoItem(state, action) {
      if (state.activeTodoItem === action.payload && state.isOpenTodosOptions === false) {
        state.isOpenTodosOptions = true;
      } else if (state.activeTodoItem === action.payload && state.isOpenTodosOptions === true) {
        state.isOpenTodosOptions = false; // close if same and already open
      } else {
        state.activeTodoItem = action.payload;
        state.isOpenTodosOptions = true; // open
      }
    },
    deleteTodoItem(state, action) {
      state.todosList = state.todosList.filter(item => item.id !== action.payload);
      state.isOpenTodosOptions = false
    },

    //   const newItem = {
    //     id: Date.now(),
    //     title: action.payload.title,
    //     is_active: true,
    //     deadline: action.payload?.date || null,
    //     subtasks: [],
    //     priority: "normal",
    //   }
    //   state.todosList.push(newItem);
    //   state.activeDayTasks.push(newItem.id)
    //   state.activeTodoItem = newItem.id
    // },
    setTodosItemIsComplete(state, action) {
      const todoItem = state.todosList.find(item => item.id === action.payload);
      if (!todoItem) return;

      todoItem.is_active = !todoItem.is_active;
    },
    setTodosItemDeadline(state, action) {
      const todoItem = state.todosList.find(item => item.id === action.payload.id);
      if (!todoItem) return;

      todoItem.deadline = action.payload.deadline
    },
    closeTodoOptions(state) {
      state.activeTodoItem = null;
      state.isOpenTodosOptions = false
    },
    addNewOptionItem(state, action) {
      const { todoId, title } = action.payload;

      const todoItem = state.todosList.find(item => item.id === todoId);
      if (!todoItem) return;

      todoItem.subtasks.push({
        id: Date.now(), // unique ID
        title,
        is_done: false,
      });
    },
    setTodoItemStatusOfImportantce(state, action) {
      const item = state.todosList.find(item => item.id === action.payload.id)
      if (item) {
        item.priority = action.payload.priority
      }
    },
    setTodoItemTitle(state, action) {
      const item = state.todosList.find(item => item.id === action.payload.id)
      if (item) {
        item.title = action.payload.title
      }
    },
    setActiveDayTasks(state, action) {
      state.activeDayTasks = action.payload
    }

  },
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(getTodosAction.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(getTodosAction.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.todosList = action.payload;
      })
      .addCase(getTodosAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Get todos failed';

      })
      .addCase(changeTodosAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeTodosAction.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.todosList.findIndex(todo => todo.id === updated.id);
        if (index !== -1) {
          state.todosList[index] = updated;
        }
      })
      .addCase(changeTodosAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Update todo failed";
      })
      .addCase(addTodoAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAction.fulfilled, (state, action) => {
        state.loading = false;
        state.activeTodoItem = action.payload.id
        state.activeDayTasks.push(action.payload.id)
        state.todosList.push(action.payload); // Add the new todo to the list
      })
      .addCase(addTodoAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add todo";
      });

  }
})
export const { setActiveTodoItem, addNewOptionItem, setTodosItemIsComplete, addNewTodoItem, deleteTodoItem, closeTodoOptions, setTodoItemStatusOfImportantce, setTodosItemDeadline, setActiveDayTasks, setTodoItemTitle } = todosSlice.actions
export default todosSlice.reducer
export const selectTodosAllItems = ((state) => state.todos.todosList);
export const selectTodosActiveItems = ((state) => state.todos.todosList.filter(item => item.is_active));
export const selectTodosCompletedItems = ((state) => state.todos.todosList.filter(item => !item.is_active))
export const selectIsOpenTodosOptions = ((state) => state.todos.isOpenTodosOptions);
export const selectActiveTodoItem = ((state) => state.todos.activeTodoItem);
export const selectTodosOptionItems = (state, activeTodoItem) =>
  state.todos.todosList.find((item) => item.id === activeTodoItem)?.subtasks || [];
export const selectActiveDayTasks = (state) => {
  const taskIds = state.todos.activeDayTasks;
  const allTasks = state.todos.todosList;

  if (!taskIds || taskIds.length === 0) return [];

  return allTasks.filter((task) => taskIds.includes(task.id));
};


