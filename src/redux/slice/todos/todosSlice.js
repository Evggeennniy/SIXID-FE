import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import fetchWithAuth from "../../../util/fetchWithAuth";
import { logout, setTokens } from "../auth/authSlice";

// [
//   {
//     id: 1,
//     title: "Протестировать работу списка заданий на SIXID",
//     deadline: "2025-05-25T17:00:00Z",
//     statusOfImportant: "срочно", // urgently
//     status: "active",
//     subtasks: [
//       {
//         id: 1,
//         title: "Открыть страницу списка заданий",
//         is_done: false,
//       },
//       {
//         id: 2,
//         title: "Проверить отображение активных задач",
//         is_done: false,
//       },
//       {
//         id: 3,
//         title: "Проверить фильтрацию по статусу",
//         is_done: true,
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "Написать юнит-тесты для новых компонентов",
//     deadline: "2025-06-01",
//     statusOfImportant: "важно", // importent
//     status: "complete",
//     subtasks: [],
//   },
//   {
//     id: 3,
//     title: "Проверить дизайн-макеты",
//     deadline: "2025-06-10",
//     statusOfImportant: "обычно", // simple
//     status: "active",
//     subtasks: [],
//   },
//   {
//     id: 4,
//     title: "Подготовить слайды презентации",
//     deadline: "2025-05-30T12:00:00Z",
//     statusOfImportant: "срочно", // urgently
//     status: "complete",
//     subtasks: [],
//   },
//   {
//     id: 5,
//     title: "Рефакторинг старого кода",
//     deadline: "2025-06-15",
//     statusOfImportant: "важно", // importent
//     status: "active",
//     subtasks: [],
//   },
// ]
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
  "todos/get",
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const access = state.auth.accessToken;
    const refresh = state.auth.refreshToken;

    try {
      const res = await fetchWithAuth(
        "/api/todos/",
        { method: "GET" },
        access,
        refresh,
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
      return rejectWithValue(error.message || "Network error");
    }
  }
);
export const changeTodosAction = createAsyncThunk(
  "todos/change",
  async ({ id, data }, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const access = state.auth.accessToken;
    const refresh = state.auth.refreshToken;

    try {
      const res = await fetchWithAuth(
        `/api/todos/${id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
        access,
        refresh,
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
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const addTodoAction = createAsyncThunk(
  "todos/add",
  async (data, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const access = state.auth.accessToken;
    const refresh = state.auth.refreshToken;

    try {
      const res = await fetchWithAuth(
        "/api/todos/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
        access,
        refresh,
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
      return rejectWithValue(error.message || "Network error");
    }
  }
);
export const deleteTodosAction = createAsyncThunk(
  "todos/delete",
  async (id, { getState, dispatch, rejectWithValue }) => {
    const state = getState();
    const access = state.auth.accessToken;
    const refresh = state.auth.refreshToken;

    try {
      const res = await fetchWithAuth(
        `/api/todos/${id}/`,
        {
          method: "DELETE",
        },
        access,
        refresh,
        (newAccess) => dispatch(setTokens({ access: newAccess })),
        () => dispatch(logout())
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData);
      }

      return id; // Return deleted todo ID to remove from state
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
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
    addNewTodoItem(state, action) {
      state.todosList.push({
        id: Date.now(),
        title: action.payload.title,
        is_active: true,
        deadline: action.payload?.date || null,
        subtasks: [],
        priority: "normal",
      });
    },
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


