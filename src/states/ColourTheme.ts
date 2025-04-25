import { create } from "zustand";
import { darkTheme } from "../../public/themes/darkTheme";
import { lightTheme } from "../../public/themes/lightTheme";
import { Theme } from "../../public/themes/theme";

interface State {
  theme: Theme;
}

interface Actions {
  changeTheme: () => void;
}

const changeThemeStore = create<State & Actions>()((set) => ({
  theme: darkTheme,
  changeTheme: () =>
    set((state) => ({
      theme: state.theme.mode === "light" ? darkTheme : lightTheme,
    })),
}));

export default changeThemeStore;
