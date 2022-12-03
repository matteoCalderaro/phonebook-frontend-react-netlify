import { gql } from '@apollo/client';

export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const USER = gql`
  query {
    me {
      username
      friends {
        name
        phone
        address {
          street
          city
        }
      }
    }
  }
`;

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation createPerson(
    $name: String!
    $street: String!
    $city: String!
    $phone: String
  ) {
    addPerson(name: $name, street: $street, city: $city, phone: $phone) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`;
export const REMOVE_PERSON = gql`
  mutation removePerson($name: String!) {
    deletePerson(name: $name) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`;

export const CREATE_FRIEND = gql`
  mutation createFriend($name: String!) {
    addAsFriend(name: $name) {
      username
      id
      friends {
        name
        phone
        id
        address {
          street
          city
        }
      }
    }
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($name: String!) {
    removeAsFriend(name: $name) {
      username
      friends {
        name
        phone
        id
        address {
          street
          city
        }
      }
    }
  }
`;

export const EDIT_NUMBER = gql`
  mutation changeContact(
    $name: String!
    $newPhone: String!
    $newStreet: String!
    $newCity: String!
  ) {
    editContact(
      name: $name
      newPhone: $newPhone
      newStreet: $newStreet
      newCity: $newCity
    ) {
      name
      phone
      id
      address {
        street
        city
      }
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
