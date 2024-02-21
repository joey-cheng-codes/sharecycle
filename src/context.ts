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

// export const userContext = createContext<UserProps | undefined>(undefined);

// export function useUserContext() {
//   const user = useContext(userContext);
//   if (user === undefined) {
//     throw new Error("useUserContext must be used with a userContext. User is undefined");
//   }
//   return user;
// }
