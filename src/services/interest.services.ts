import { InterestType } from "../typings/backend-types";
import {
  ApiErrorResponse,
  ApiInterestResponse,
  ApiInterestsResponse,
} from "../typings/backend-api-types";
import { VITE_API_URL } from "../config/app.config";

export async function fetchInterests(): Promise<
  [string | null, InterestType[]]
> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/interests`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiInterestsResponse: ApiInterestsResponse = await response.json();
    return [null, apiInterestsResponse.interests];
  } catch (error) {
    if (error instanceof Error) return [error.message, []];
    return ["Unknown Error", []];
  }
}

export async function fetchInterest({
  id,
}: {
  id: string;
}): Promise<[string | null, InterestType | null]> {
  try {
    const response = await fetch(`${VITE_API_URL}/api/interests/${id}`, {
      credentials: "include",
    });
    if (!response.ok) {
      const apiErrorResponse: ApiErrorResponse = await response.json();
      throw new Error(apiErrorResponse.error);
    }
    const apiInterestResponse: ApiInterestResponse = await response.json();
    return [null, apiInterestResponse.interest];
  } catch (error) {
    if (error instanceof Error) return [error.message, null];
    return ["Unknown Error", null];
  }
}
