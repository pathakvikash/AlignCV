import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const defaultTheme = window.localStorage.getItem("theme") || "light";
    setTheme(defaultTheme);
  }, []);

  return theme;
}
