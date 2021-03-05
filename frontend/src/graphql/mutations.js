import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const EDIT_OWN_CHALLENGE = gql`
  mutation editOwnChallenge($challengeID: String!, $entry: String!) {
    editOwnChallenge(id: $challengeID, entry: $entry) {
      id
      entries
    }
  }
`;

export const STOP_OWN_CHALLENGE = gql`
  mutation editOwnChallenge($challengeID: String!) {
    editOwnChallenge(id: $challengeID, stop: true) {
      id
      entries
      active
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!,
   $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
      password
    }
  }
`;

export const CREATE_OWN_CHALLENGE = gql`
  mutation createOwnChallenge($challengeID: String!,
   $userID: String!, $description: String, $startDate: String, $endDate: String) {
    createOwnChallenge(challengeID: $challengeID, userID: $userID, description: $description, startDate: $startDate, endDate: $endDate) {
      challenge {
      id 
      name
      }
      user {
      id
      username
      }
      description
      startDate
      endDate
    }
  }
`;
