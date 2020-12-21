import { useQuery } from "@apollo/client";
import {ALL_OWN_CHALLENGES} from "../graphql/queries";

const useOwnChallenges = () => {
  const { data } = useQuery(ALL_OWN_CHALLENGES, {
    fetchPolicy: "cache-and-network",
  });
  return data ? data.allOwnChallenges : undefined;
};

export default useOwnChallenges;
