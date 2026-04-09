import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "smooth";
    });
  }, [pathname]);

  return null;
}
