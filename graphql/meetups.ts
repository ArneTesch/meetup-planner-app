import { gql } from "apollo-boost";

export const GET_MEETUPS = gql`
  {
    meetups {
      _id
      title
      description
      date
      location
      speakers {
        _id
        name
        age
        expertise {
          title
          domain
        }
        nationality
        avatar
      }
      visitors {
        _id
        lastName
        firstname
        email
      }
    }
  }
`;
