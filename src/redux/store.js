import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../redux/features/data/dataSlice";
import authReducer from "../redux/features/auth/authSlice";
import filterReducer from "../redux/features/auth/filterSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    auth: authReducer,
    filter: filterReducer,
  },
});
