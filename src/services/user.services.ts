import { VITE_API_URL } from "../config/app.config";
import {
  ApiErrorResponse,
  ApiLoginUserResponse,
  ApiLogoutUserResponse,
  ApiRegisterUserResponse,
  ApiUserResponse,
  ApiUsersResponse,
} from "../typings/backend-api-types";
import { UserType } from "../typings/backend-types";

export async function fetchUsers(): Promise<[string | null, UserType[]]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/users`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiUsersResponse: ApiUsersResponse = await response.json();
    return [null, apiUsersResponse.users];
  } catch (error) {
    if (error instanceof Error) return [error.message, []];
    return ["Unknown Error", []];
  }
}

export async function fetchUser({
  id,
}: {
  id: string;
}): Promise<[string | null, UserType | null]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/users/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiUserResponse: ApiUserResponse = await response.json();
    return [null, apiUserResponse.user];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}

export async function usersLogin({
  data,
}: {
  data: { username: string; password: string };
}): Promise<[string | null, UserType | null]> {
  try {
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
    return [null, apiLoginUserResponse.user];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}

export async function usersRegister({
  data,
}: {
  data: { username: string; password: string };
}): Promise<[string | null, boolean]> {
  try {
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
    return [null, apiRegisterUserResponse.ok];
  } catch (error) {
    if (error instanceof Error) return [error.message, false];
    return ["Unknown Error", false];
  }
}

export async function usersLogout(): Promise<[string | null, boolean]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/users/logout`, {
      credentials: "include",
      method: "POST",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiLogoutUserResponse: ApiLogoutUserResponse = await response.json();
    return [null, apiLogoutUserResponse.ok];
  } catch (error) {
    if (error instanceof Error) return [error.message, false];
    return ["Unknown Error", false];
  }
}

export async function usersSession(): Promise<
  [string | null, UserType | null]
> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/users/session`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiUserSessionResponse: ApiUserResponse = await response.json();
    return [null, apiUserSessionResponse.user];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}
