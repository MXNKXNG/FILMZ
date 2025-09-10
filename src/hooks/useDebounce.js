import { useEffect, useState } from "react";

export const useDebounce = (v, ms = 300) => {
  const [debounce, setDebounce] = useState(v);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(v);
    }, ms);
    return () => {
      clearTimeout(timer);
    };
  }, [v, ms]);
  return debounce;
};
