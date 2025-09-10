import { createAsyncThunk } from "@reduxjs/toolkit";
const apiKey = import.meta.env.VITE_API_KEY;
const token = apiKey.replace(/^['"]|['"]$/g, "").trim();

if (!token) {
  throw new Error(
    "VITE_API_KEY가 빌드 타임에 주입되지 않았습니다. (Preview/Production 환경변수 설정 및 재배포 필요)"
  );
}
if (!token.startsWith("eyJ")) {
  throw new Error(
    "VITE_API_KEY 형식 오류: v4 Read Access Token(eyJ...)인지 확인하세요."
  );
}

// 받을 데이터 기본 틀
export const shapeData = (result) =>
  (result.results ?? []).map((el) => ({
    id: el.id,
    title: el.title ?? "",
    original_title: el.original_title ?? "",
    poster_path: el.poster_path ?? null,
    backdrop_path: el.backdrop_path ?? null,
    genre_ids: el.genre_ids ?? null,
    overview: el.overview ?? "",
    release_date: el.release_date ?? null,
    vote_average: el.vote_average ?? 0,
  }));

// 현재 상영 & 인기 영화 리스트
export const fetchMovieList = createAsyncThunk(
  "movies/fetchMovieList",
  async ({ page = 1, minDate, maxDate } = {}, { signal, rejectWithValue }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    };

    const nowPlayingURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&region=KR&sort_by=popularity.desc&vote_count.gte=50&with_origin_country=KR&with_release_type=2|3`;
    const popularURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&region=KR&sort_by=vote_count.desc&vote_count.gte=600&with_origin_country=KR&with_release_type=2|3`;

    try {
      const [popularRes, nowPlayingRes] = await Promise.all([
        fetch(popularURL, { ...options }),
        fetch(nowPlayingURL, { ...options }),
      ]);

      if (!popularRes.ok || !nowPlayingRes.ok) {
        throw new Error("요청 실패");
      }

      const [popularJson, nowPlayingJson] = await Promise.all([
        popularRes.json(),
        nowPlayingRes.json(),
      ]);

      return {
        popular: {
          data: shapeData(popularJson),
        },
        nowPlaying: {
          data: shapeData(nowPlayingJson),
        },
      };
    } catch (e) {
      return rejectWithValue(e.message || "네트워크 오류");
    }
  }
);

// 개봉 예정 리스트
export const fetchUpComingList = createAsyncThunk(
  "movies/fetchUpComingList",
  async ({ page = 1, minDate, maxDate }, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    };

    const upComingURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&primary_release_date.gte=${minDate}&primary_release_date.lte=${maxDate}&region=KR&sort_by=popularity.desc&with_origin_country=KR&with_release_type=2|3`;
    const response = await fetch(`${upComingURL}`, { ...options });
    const data = await response.json();

    return {
      upComing: {
        data: shapeData(data),
      },
    };
  }
);

// 디테일 정보
export const fetchDetails = createAsyncThunk(
  "movie/fetchDetails",
  async (id, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    };

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=ko-KR&append_to_response=videos,images,credits&include_image_language=en&include_video_language=ko`,
      options
    );
    const data = await response.json();

    return data;
  }
);

// 검색 리스트
export const fetchSearch = createAsyncThunk(
  "movie/fetchSearch",
  async (q, { signal }) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal,
    };
    if (encodeURIComponent(q).length > 2) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          q
        )}&language=ko-KR&include_adult=false&page=1`,
        options
      );

      const data = await response.json();
      return data;
    }
  }
);
