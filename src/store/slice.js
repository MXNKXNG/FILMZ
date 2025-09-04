import { createSlice } from "@reduxjs/toolkit";
import { fetchMovieDetail, fetchMovieList } from "./thunk";

export const movieListSlice = createSlice({
  name: "movieList",
  initialState: {
    listData: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieList.pending, (state) => {
        console.log("list pending");
        state.status = "loading";
      })
      .addCase(fetchMovieList.rejected, (state) => {
        console.log("list failed");
        state.status = "failed";
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        console.log("list succeeded");
        state.status = "succeeded";
        state.listData = action.payload;
      });
  },
});

export const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    detailData: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        console.log("list pending");
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.rejected, (state) => {
        console.log("list failed");
        state.status = "failed";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        console.log("list succeeded");
        state.status = "succeeded";
        state.detailData = action.payload;
      });
  },
});
