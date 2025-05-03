import { createContext, useContext, useEffect, useState } from "react";
import { UserType } from "../typings/backend-types";
import { VITE_API_URL } from "../config/app.config";
import {
  ApiErrorResponse,
  ApiLoginUserResponse,
  ApiLogoutUserResponse,
  ApiRegisterUserResponse,
  ApiUserResponse,
} from "../typings/backend-api-types";

interface UserContextInterface {
  isLoading: boolean;
  isError: string | null;
  userLogged: UserType | null;
  login: (data: {
    data: { username: string; password: string };
  }) => Promise<boolean>;
  signUp: (data: {
    data: { username: string; password: string };
  }) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<UserContextInterface>({
  isLoading: false,
  isError: null,
  userLogged: null,
  login: () => Promise.resolve(false),
  signUp: () => Promise.resolve(false),
  logout: () => Promise.resolve(false),
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [userLogged, setUserLogged] = useState<UserType | null>(null);

  const login = async ({
    data,
  }: {
    data: { username: string; password: string };
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/users/login`, {
        body: JSON.stringify(data),
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      const apiLoginUserResponse: ApiLoginUserResponse = await response.json();
      setUserLogged(apiLoginUserResponse.user);
      return true;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error logging in");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async ({
    data,
  }: {
    data: { username: string; password: string };
  }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/users/register`, {
        body: JSON.stringify(data),
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      const apiRegisterUserResponse: ApiRegisterUserResponse =
        await response.json();
      return apiRegisterUserResponse.ok;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error signing up");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${VITE_API_URL}/api/users/logout`, {
        credentials: "include",
        method: "POST",
      });
      if (!response.ok) {
        const apiErrorResponse: ApiErrorResponse = await response.json();
        throw new Error(apiErrorResponse.error);
      }
      const apiLogoutUserResponse: ApiLogoutUserResponse =
        await response.json();
      return apiLogoutUserResponse.ok;
    } catch (error) {
      if (error instanceof Error) setIsError(error.message);
      else setIsError("Error logging out");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/users/session`, {
          credentials: "include",
        });
        if (!response.ok) {
          const apiErrorResponse: ApiErrorResponse = await response.json();
          throw new Error(apiErrorResponse.error);
        }
        const apiUserSessionResponse: ApiUserResponse = await response.json();
        setUserLogged(apiUserSessionResponse.user);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Unknown Error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isError,
        userLogged,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
