import { useState } from "react";
import { createContext } from "./base";

export const SettingContext = createContext(() => {
  const [data, setData] = useState({
    theme: "light",
  });

  return {
    data,
    setTheme() {
      setData({
        theme: "dark",
      });
    },
  };
});
