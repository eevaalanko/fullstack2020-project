import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
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
