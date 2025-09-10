import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDetails,
  fetchMovieList,
  fetchSearch,
  fetchUpComingList,
} from "./thunk";

// 현재 상영 & 인기 영화 슬라이스
export const movieListSlice = createSlice({
  name: "listData",
  initialState: {
    status: "idle",
    error: null,
    baseUrl: "https://image.tmdb.org/t/p/w300",
    popular: { data: [] },
    nowPlaying: { data: [] },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieList.pending, (state) => {
        console.log("pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovieList.rejected, (state, action) => {
        console.log("failed");
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchMovieList.fulfilled, (state, action) => {
        console.log("succeeded");
        state.status = "succeeded";
        state.upComing = action.payload.upComing;
        state.popular = action.payload.popular;
        state.nowPlaying = action.payload.nowPlaying;
      });
  },
});

// 개봉 예정 슬라이스
export const upComingListSlice = createSlice({
  name: "upComingList",
  initialState: {
    upComing: { data: [] },
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/original",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpComingList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUpComingList.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUpComingList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upComing = action.payload.upComing;
      });
  },
});

// 영화 디테일 정보 슬라이스
export const detailSlice = createSlice({
  name: "movieDetails",
  initialState: {
    data: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetails.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

// 검색 정보 슬라이스
export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    data: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w300",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearch.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});
