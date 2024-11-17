import { createContext, useContext, useState } from "react";
import { UserType } from "../typings/backend-types";
import { usersLogin, usersRegister } from "../services/user.services";

interface UserContextInterface {
  userLoading: boolean;
  userError: string | null;
  user: UserType | null;
  login: (data: {
    data: { username: string; password: string };
  }) => Promise<void>;
  register: (data: {
    data: { username: string; password: string };
  }) => Promise<void>;
}

const UserContext = createContext<UserContextInterface>({
  userLoading: false,
  userError: "",
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userLoading, setLoading] = useState<boolean>(true);
  const [userError, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const login = async ({
    data,
  }: {
    data: { username: string; password: string };
  }) => {
    const [error, user] = await usersLogin({ data });
    setError(error);
    setUser(user);
    setLoading(false);
  };

  const register = async ({
    data,
  }: {
    data: { username: string; password: string };
  }) => {
    const [error, ok] = await usersRegister({ data });
    setError(error);
    if (ok) alert("User created successfully");
  };

  return (
    <UserContext.Provider
      value={{ userLoading, userError, user, login, register }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
