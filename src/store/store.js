import { configureStore } from "@reduxjs/toolkit";
import { movieDetailSlice, movieListSlice } from "./slice";

export const store = configureStore({
  reducer: {
    movieList: movieListSlice.reducer,
    movieDetail: movieDetailSlice.reducer,
  },
});
