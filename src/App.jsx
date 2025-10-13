import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/Layout";
import { ProfileLayout } from "./components/ProfileLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Main } from "./pages/Main";
import { MyList } from "./pages/MyList";
import { MyPage } from "./pages/MyPage";
import { NotFound } from "./pages/NotFound";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* 전역 공통 레이아웃 */}
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/main/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* 프로필 공통 레이아웃 */}
          <Route path="/mypage" element={<ProfileLayout />}>
            <Route path=":id" element={<MyPage />} />
            <Route path="list/:id" element={<MyList />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
