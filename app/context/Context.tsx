"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { authUserType } from "@/app/UITypes/types";
import useGetAuthUser from "../hooks/useGetAuthUser";

interface GlobalType {
  authUser: authUserType;
  setAuthUser: Dispatch<SetStateAction<authUserType>>;
}

const GlobalContext = createContext<null | GlobalType>(null);

const Context = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<authUserType>({
    id: "",
    username: "",
    email: "",
    bio: "",
    link: "",
    followers: [],
    following: [],
    createdAt: "",
    updatedAt: "",
  });

  const { data: authUsr } = useGetAuthUser();

  useEffect(() => {
    if (authUsr?.currentUser) {
      const safeUser = authUsr.currentUser;
      setAuthUser(safeUser);
    }
  }, [authUsr]);

  return (
    <GlobalContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("child component must be in the Provider");
  }
  return context;
};

export { Context, useGlobalContext };
