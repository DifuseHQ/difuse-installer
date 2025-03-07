import { createContext } from "solid-js";
import { AppState } from "./types";
import { SetStoreFunction } from "solid-js/store";

export const AppStateContext = createContext<{
  appState: AppState;
  setAppState: SetStoreFunction<AppState>;
}>();
