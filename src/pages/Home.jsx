import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { fetchMovieList } from "../store/thunk";
export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieList());

    const timer = setTimeout(() => {
      navigate("/main");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, navigate]);

  return (
    <section className="h-dvh flex flex-col justify-center items-center gap-10">
      <h1>home UI</h1>
      <Link className="border p-4" to="/main">
        Go to the main page
      </Link>
    </section>
  );
};
