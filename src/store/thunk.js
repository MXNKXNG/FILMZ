import { createAsyncThunk } from "@reduxjs/toolkit";
const apiKey = import.meta.env.VITE_API_KEY;

// Upcoming 리스트 API
export const fetchUpComingList = createAsyncThunk(
  "movies/fetchUpComingList",
  async (page = 1, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=${page}`,
      options
    );
    const data = await response.json();

    return { ...data, results: data.results.filter((el) => !el.adult) };
  }
);

// Popular 리스트 API
export const fetchPopularList = createAsyncThunk(
  "movies/fetchPopularList",
  async (page = 1, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`,
      options
    );
    const data = await response.json();

    return { ...data, results: data.results.filter((el) => !el.adult) };
  }
);

// Now-Playing 리스트
export const fetchNowList = createAsyncThunk(
  "movies/fetchNowList",
  async (page = 1, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`,
      options
    );

    const data = await response.json();

    return { ...data, results: data.results.filter((el) => !el.adult) };
  }
);

// 디테일 정보 API
export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`,
      options
    );
    const data = await response.json();

    return data;
  }
);

// 영화 로고 API
export const fetchMovieLogo = createAsyncThunk(
  "movie/fetchMovieLogo",
  async (id, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
    const data = await response.json();
    const filterData = data.logos.filter(
      (el) => el.iso_639_1 === "ko" || el.iso_639_1 === "en"
    );

    return filterData;
  }
);
