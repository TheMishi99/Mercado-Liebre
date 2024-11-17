import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../typings/backend-types";
import { fetchUsers } from "../services/user.services";

interface UsersContextInterface {
  usersLoading: boolean;
  usersError: string | null;
  users: UserType[];
}

const UsersContext = createContext<UsersContextInterface>({
  usersLoading: true,
  usersError: null,
  users: [],
});

export default function UsersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const [error, users] = await fetchUsers();
    setUsersError(error);
    setUsers(users);
    setUsersLoading(false);
  };

  return (
    <UsersContext.Provider value={{ usersLoading, usersError, users }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
