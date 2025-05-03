import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../typings/backend-types";
import { VITE_API_URL } from "../config/app.config";
import {
  ApiErrorResponse,
  ApiUsersResponse,
} from "../typings/backend-api-types";

interface UsersContextInterface {
  isLoading: boolean;
  isError: string | null;
  users: UserType[];
  getUser: ({ id }: { id: string }) => UserType | null;
}

const UsersContext = createContext<UsersContextInterface>({
  isLoading: true,
  isError: null,
  users: [],
  getUser: () => null,
});

export default function UsersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUser = ({ id }: { id: string }) => {
    const user = users.find((u) => u.id === Number(id));
    return user || null;
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/users`, {
          credentials: "include",
        });
        if (!response.ok) {
          const apiErrorResponse: ApiErrorResponse = await response.json();
          throw new Error(apiErrorResponse.error);
        }
        const apiUsersResponse: ApiUsersResponse = await response.json();
        setUsers(apiUsersResponse.users);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Error fetching users");
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ isLoading, isError, users, getUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export const useUsers = () => useContext(UsersContext);
