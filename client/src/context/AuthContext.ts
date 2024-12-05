import { createContext } from "react";

interface AuthContextProps {
  user: any;
  setUser: (user: any) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  setUser: () => {},
});
