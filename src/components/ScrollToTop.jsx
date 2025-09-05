import { useEffect } from "react";
import { useLocation } from "react-router";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  console.log("[ScrollToTop] render:", pathname);

  useEffect(() => {
    console.log("[ScrollToTop] path:", pathname);
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);
  return null;
};
