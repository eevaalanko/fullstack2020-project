import { gql } from "@apollo/client";

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const ALL_CHALLENGES = gql`
  query {
    allChallenges {
      id
      name
      description
      link
      duration
      ownChallenges {
        id
        description
        startDate
        endDate
        active
        entries
        abortDate
      }
    }
  }
`;

export const ACTIVE_OWN_CHALLENGES = gql`
  query {
    activeOwnChallenges {
      id
      challenge {
        id
        name
      }
      user {
        username
      }
      description
      startDate
      endDate
      active
      entries
      abortDate
    }
  }
`;
