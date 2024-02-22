import { createContext, useContext } from "react";
import { UserProps } from "./types";

interface UserContextType {
  user: UserProps | undefined;
  updateUser: (user: UserProps) => void;
}

export const userContext = createContext<UserContextType>({
  user: undefined,
  updateUser: () => { },
});

export const useUserContext = () => useContext(userContext);
