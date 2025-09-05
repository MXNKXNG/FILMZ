import { Link, Outlet } from "react-router";
export const Layout = () => {
  return (
    <>
      <header className="inset-x top-0 text-xs min-[750px]:text-sm whitespace-nowrap ">
        <nav className="flex fixed border z-50 justify-between items-center px-10 py-5 w-screen h-20 bg-white ">
          <Link to="/">
            <h1 className="text-2xl">FiLMZ</h1>
          </Link>

          <ul className="flex justify-center items-center gap-10">
            <li>
              <Link to="/main">로그인</Link>
            </li>
            <li>
              <Link to="/main">회원가입</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
};
