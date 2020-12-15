import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

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
      startDate
    }
  }
`;

export const ALL_OWN_CHALLENGES = gql`
  query {
    allOwnChallenges {
      id
      challenge {
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
