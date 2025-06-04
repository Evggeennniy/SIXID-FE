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
  isOpenTodosOptions: false
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
        status: "active",
        deadline: action.payload?.date || null,
        subtasks: [],
        priority: "обычно",
      });
    },
    setTodosItemIsComplete(state, action) {
      const todoItem = state.todosList.find(item => item.id === action.payload);
      if (!todoItem) return;

      todoItem.status = todoItem.status === "complete" ? "active" : "complete";
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

  }
})
export const { setActiveTodoItem, addNewOptionItem, setTodosItemIsComplete, addNewTodoItem, deleteTodoItem, closeTodoOptions, setTodoItemStatusOfImportantce, setTodosItemDeadline } = todosSlice.actions
export default todosSlice.reducer
export const selectTodosAllItems = ((state) => state.todos.todosList);
export const selectTodosActiveItems = ((state) => state.todos.todosList.filter(item => item.is_active));
export const selectTodosCompletedItems = ((state) => state.todos.todosList.filter(item => !item.is_active))
export const selectIsOpenTodosOptions = ((state) => state.todos.isOpenTodosOptions);
export const selectActiveTodoItem = ((state) => state.todos.activeTodoItem);
export const selectTodosOptionItems = (state, activeTodoItem) =>
  state.todos.todosList.find((item) => item.id === activeTodoItem)?.subtasks || [];
