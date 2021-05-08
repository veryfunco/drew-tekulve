import { createContext, useContext } from "react";

const AppContext = createContext({
  jobTitle: "",
  email: "",
  metaDescription: "",
});

export const AppContextProvider = AppContext.Provider;

export function useAppContext() {
  return useContext(AppContext);
}
