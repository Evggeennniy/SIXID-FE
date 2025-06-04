
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  activeDay: null,
  isOpenCalendarOptions: false,
  activeDayTasks: [],
}

const calendarSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setActiveCalendarDay(state, action) {
      const selectedDate = action.payload;
      if (state.activeDay === selectedDate) {
        state.activeDay = null;
        state.isOpenCalendarOptions = !state.isOpenCalendarOptions; // toggle
      } else {
        state.activeDay = selectedDate;
        state.isOpenCalendarOptions = true;
      }
    },
    closeCalendarOptions(state) {
      state.activeCalendarItem = null;
      state.isOpenCalendarOptions = false
    },
    setActiveDayTasks(state, action) {
      state.activeDayTasks = action.payload
    }
  }
})
export const { setActiveCalendarDay, closeCalendarOptions, setActiveDayTasks } = calendarSlice.actions
export default calendarSlice.reducer

export const selectIsOpenCalendarOptions = ((state) => state.calendar.isOpenCalendarOptions);
export const selectActiveDayTasks = ((state) => state.calendar.activeDayTasks);
export const selectActiveCalendarDay = ((state) => state.calendar.activeDay);

