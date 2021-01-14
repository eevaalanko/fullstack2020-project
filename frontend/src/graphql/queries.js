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
      active
    }
  }
`;

export const ALL_OWN_CHALLENGES = gql`
  query {
    allOwnChallenges {
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
    }
  }
`;
