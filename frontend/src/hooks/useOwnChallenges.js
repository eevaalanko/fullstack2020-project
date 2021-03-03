import { useQuery } from "@apollo/client";
import {ACTIVE_OWN_CHALLENGES} from "../graphql/queries";

const useActiveOwnChallenges = () => {
  const { data } = useQuery(ACTIVE_OWN_CHALLENGES, {
    fetchPolicy: "cache-and-network",
  });
  return data ? data.activeOwnChallenges : undefined;
};

export default useActiveOwnChallenges;
