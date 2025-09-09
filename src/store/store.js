import { configureStore } from "@reduxjs/toolkit";
import {
  detailSlice,
  movieListSlice,
  searchSlice,
  upComingListSlice,
} from "./slice";

export const store = configureStore({
  reducer: {
    movieList: movieListSlice.reducer,
    upComingList: upComingListSlice.reducer,
    details: detailSlice.reducer,
    searchList: searchSlice.reducer,
  },
});
