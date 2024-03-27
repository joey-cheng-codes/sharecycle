import { createContext, useContext } from "react";
import { UserProps } from "./types";

interface UserContextType {
  user: UserProps | undefined;
  setUser: (user: UserProps | undefined) => void;
}

export const userContext = createContext<UserContextType>({
  user: undefined,
  setUser: () => { },
});

export const useUserContext = () => useContext(userContext);
