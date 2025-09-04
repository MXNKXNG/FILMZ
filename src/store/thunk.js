import { createAsyncThunk } from "@reduxjs/toolkit";
import detailData from "../assets/data/movieDetailData.json";
import listData from "../assets/data/movieListData.json";

export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(listData), 0);
    });
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(detailData), 0);
    });
  }
);
