import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expense: [],
  totalAmount: 0,
};

const MyExpenseSlice = createSlice({
  name: "myexp",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
  },
});

export const MyExpenseAction = MyExpenseSlice.actions;
export default MyExpenseSlice.reducer;
