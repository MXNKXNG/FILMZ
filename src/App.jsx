import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Detail } from "./pages/Detail";
import { Home } from "./pages/Home";
import { Main } from "./pages/Main";
import { MyList } from "./pages/MyList";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route index element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/main" element={<Main />} />
          <Route path="/mylist" element={<MyList />} />
          <Route path="/main/:id" element={<Detail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
