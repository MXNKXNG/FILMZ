import { configureStore } from "@reduxjs/toolkit";
import {
  movieDetailSlice,
  movieLogoSlice,
  nowListSlice,
  popularListSlice,
  upComingListSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    upComingList: upComingListSlice.reducer,
    popularList: popularListSlice.reducer,
    nowList: nowListSlice.reducer,
    detail: movieDetailSlice.reducer,
    logo: movieLogoSlice.reducer,
  },
});
