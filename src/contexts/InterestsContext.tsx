import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { InterestType } from "../typings/backend-types";
import {
  ApiErrorResponse,
  ApiInterestsResponse,
} from "../typings/backend-api-types";
import { VITE_API_URL } from "../config/app.config";

interface InterestsContextInterface {
  isLoading: boolean;
  isError: string | null;
  interests: InterestType[];
}

const InterestsContext = createContext<InterestsContextInterface>({
  isLoading: true,
  isError: null,
  interests: [],
});

export default function InterestsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<string | null>(null);
  const [interests, setInterests] = useState<InterestType[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await fetch(`${VITE_API_URL}/api/interests`, {
          credentials: "include",
        });
        if (!response.ok) {
          const apiErrorResponse: ApiErrorResponse = await response.json();
          throw new Error(apiErrorResponse.error);
        }
        const apiInterestsResponse: ApiInterestsResponse =
          await response.json();
        setInterests(apiInterestsResponse.interests);
      } catch (error) {
        if (error instanceof Error) setIsError(error.message);
        else setIsError("Error fetching interests");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInterests();
  }, []);

  return (
    <InterestsContext.Provider value={{ isLoading, isError, interests }}>
      {children}
    </InterestsContext.Provider>
  );
}

export const useInterests = () => useContext(InterestsContext);
