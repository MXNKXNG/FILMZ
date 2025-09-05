import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMovieDetail,
  fetchMovieLogo,
  fetchNowList,
  fetchPopularList,
  fetchUpComingList,
} from "./thunk";

//
export const upComingListSlice = createSlice({
  name: "upComingList",
  initialState: {
    upComingList: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpComingList.pending, (state) => {
        console.log("upComing pending");
        state.status = "loading";
      })
      .addCase(fetchUpComingList.rejected, (state) => {
        console.log("upComing failed");
        state.status = "failed";
      })
      .addCase(fetchUpComingList.fulfilled, (state, action) => {
        console.log("upComing succeeded");
        state.status = "succeeded";
        state.upComingList = action.payload;
      });
  },
});

export const popularListSlice = createSlice({
  name: "popularList",
  initialState: {
    popularList: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularList.pending, (state) => {
        console.log("popularList pending");
        state.status = "loading";
      })
      .addCase(fetchPopularList.rejected, (state) => {
        console.log("popularList failed");
        state.status = "failed";
      })
      .addCase(fetchPopularList.fulfilled, (state, action) => {
        console.log("popularList succeeded");
        state.status = "succeeded";
        state.popularList = action.payload;
      });
  },
});

export const nowListSlice = createSlice({
  name: "nowList",
  initialState: {
    nowList: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNowList.pending, (state) => {
        console.log("nowList pending");
        state.status = "loading";
      })
      .addCase(fetchNowList.rejected, (state) => {
        console.log("nowList failed");
        state.status = "failed";
      })
      .addCase(fetchNowList.fulfilled, (state, action) => {
        console.log("nowList succeeded");
        state.status = "succeeded";
        state.nowList = action.payload;
      });
  },
});

export const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState: {
    detail: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetail.pending, (state) => {
        console.log("Detail pending");
        state.status = "loading";
      })
      .addCase(fetchMovieDetail.rejected, (state) => {
        console.log("Detail failed");
        state.status = "failed";
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        console.log("Detail succeeded");
        state.status = "succeeded";
        state.detail = action.payload;
      });
  },
});

export const movieLogoSlice = createSlice({
  name: "movieLogo",
  initialState: {
    logo: [],
    status: "idle",
    baseUrl: "https://image.tmdb.org/t/p/w500",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieLogo.pending, (state) => {
        state.status = "loading";
        console.log("logo pending");
      })
      .addCase(fetchMovieLogo.rejected, (state) => {
        state.status = "failed";
        console.log("logo failed");
      })
      .addCase(fetchMovieLogo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logo = action.payload;
        console.log("logo succeeded");
      });
  },
});
