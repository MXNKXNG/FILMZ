import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo2.png";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <section className="h-dvh flex flex-col justify-center items-center ">
      <Link className="p-4 text-white animate-logo" to="/main">
        <img src={logo} width={140} alt="logo image" />
      </Link>
    </section>
  );
};
