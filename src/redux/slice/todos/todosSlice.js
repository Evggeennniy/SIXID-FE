import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  todosList: [
    {
      title: "Протестировать работу списка заданий на SIXID",
      deadline: "2025-05-25T17:00:00Z",
      statusOfImportant: "срочно", // urgently
      status: "active",
      subtasks: [
        {
          id: 1,
          title: "Открыть страницу списка заданий",
          is_done: false,
        },
        {
          id: 2,
          title: "Проверить отображение активных задач",
          is_done: false,
        },
        {
          id: 3,
          title: "Проверить фильтрацию по статусу",
          is_done: true,
        },
      ],
    },
    {
      title: "Написать юнит-тесты для новых компонентов",
      deadline: "2025-06-01",
      statusOfImportant: "важно", // importent
      status: "complete",
      subtasks: []
    },
    {
      title: "Проверить дизайн-макеты",
      deadline: "2025-06-10",
      statusOfImportant: "обычно", // simple
      status: "active",
      subtasks: []
    },
    {
      title: "Подготовить слайды презентации",
      deadline: "2025-05-30T12:00:00Z",
      statusOfImportant: "срочно", // urgently
      status: "complete",
      subtasks: []
    },
    {
      title: "Рефакторинг старого кода",
      deadline: "2025-06-15",
      statusOfImportant: "важно", // importent
      status: "active",
      subtasks: []
    },
  ],
  activeTodoItem: null,
  isOpenTodosOptions: false
}

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
    addNewOptionItem(state, action) {
      const todoItem = state.todosList.find(
        (item) => item.title === state.activeTodoItem
      );

      if (!todoItem) return;

      todoItem.subtasks.push({
        title: action.payload,
        id: todoItem.subtasks.length,
        is_done: false,
      });
    },
    addNewTodoItem(state, action) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      state.todosList.push({ title: action.payload, status: 'active', deadline: tomorrow, subtasks: [], statusOfImportant: 'обычно' })
    },
    setTodosItemIsComplete(state, action) {
      const todoItem = state.todosList.find(
        (item) => item.title === action.payload
      );

      if (!todoItem) return;
      if (todoItem.status === 'complete') {
        todoItem.status = 'active'
      } else {
        todoItem.status = 'complete'
      }

    },
  }
})
export const { setActiveTodoItem, addNewOptionItem, setTodosItemIsComplete, addNewTodoItem } = todosSlice.actions
export default todosSlice.reducer

export const selectTodosActiveItems = ((state) => state.todos.todosList.filter(item => item.status === 'active'));
export const selectTodosCompletedItems = ((state) => state.todos.todosList.filter(item => item.status === 'complete'))
export const selectIsOpenTodosOptions = ((state) => state.todos.isOpenTodosOptions);
export const selectActiveTodoItem = ((state) => state.todos.activeTodoItem);
export const selectTodosOptionItems = (state, activeTodoItem) =>
  state.todos.todosList.find((item) => item.title === activeTodoItem)?.subtasks || [];