import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // dispatch(fetchNowList(1));
    const timer = setTimeout(() => {
      navigate("/main");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <section className="h-dvh flex flex-col justify-center items-center gap-10">
      <Link className="border p-4" to="/main">
        Go to the main page
      </Link>
    </section>
  );
};
