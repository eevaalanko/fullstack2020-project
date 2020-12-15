import { useQuery } from "@apollo/client";
import {ALL_CHALLENGES} from "../graphql/queries";

const useChallenges = () => {
  const { data } = useQuery(ALL_CHALLENGES, {
    fetchPolicy: "cache-and-network",
  });
  return data ? data.allChallenges : undefined;
};

export default useChallenges;
