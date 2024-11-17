import { useEffect, useState } from "react";
import { fetchInterests } from "../services/interest.services";
import { InterestType } from "../typings/backend-types";

export default function useInterests(): [
  boolean,
  string | null,
  InterestType[]
] {
  const [interestsLoading, setInterestsLoading] = useState<boolean>(true);
  const [interestsError, setInterestsError] = useState<string | null>(null);
  const [interests, setInterests] = useState<InterestType[]>([]);

  useEffect(() => {
    getInterests();
  }, []);

  const getInterests = async () => {
    const [error, interests] = await fetchInterests();
    setInterestsError(error);
    setInterests(interests);
    setInterestsLoading(false);
  };

  return [interestsLoading, interestsError, interests];
}
