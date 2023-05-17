import { configureStore } from "@reduxjs/toolkit";
import themeSliceReducer from "./themeSlice";
import MyExpenseSliceReducer from "./MyExpenseSlice";
import AuthSliceReducer from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    expense: MyExpenseSliceReducer,
    theme: themeSliceReducer,
  },
});

export default store;
