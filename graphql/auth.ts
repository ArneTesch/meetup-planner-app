import { gql } from "apollo-boost";

export const LOGIN = gql`
  query VisitorLogin($email: String!, $password: String!) {
    visitorLogin(email: $email, password: $password) {
      visitorId
      token
      tokenExpiration
    }
  }
`;

export const REGISTER_USER = gql`
  mutation CreateVisitor(
    $firstname: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createVisitor(
      visitorInput: {
        firstname: $firstname
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      visitorId
      token
      tokenExpiration
    }
  }
`;
