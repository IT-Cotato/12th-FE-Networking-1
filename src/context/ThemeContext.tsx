import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { ThemeName } from "../styles/theme";

type ThemeState = {
  themeName: ThemeName;
};

type ThemeAction = { type: "TOGGLE_THEME" };

const initialState: ThemeState = {
  themeName: "light",
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { themeName: state.themeName === "light" ? "dark" : "light" };
    default:
      return state;
  }
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
