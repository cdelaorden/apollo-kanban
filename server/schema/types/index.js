module.exports = `
  type User {
    id: Int! # ! means is mandatory
    username: String!
    createdAt: Int
  }

  type Comment {
    id: Int!
    text: String
    createdAt: Int
    author: User
  }

  type Card {
    id: Int!
    title: String
    description: String
    displayOrder: Int
    author: User
    comments: [Comment]
  }

  type Lane {
    id: Int!
    title: String!
    displayOrder: Int!
    cards: [Card]
  }

  type Board {
    id: Int!
    name: String
    isPublic: Boolean
    owner: User
    lanes: [Lane]
    members: [User]
  }

  type Query {
    boards: [Board]
    board(id: Int!): Board
    me: User
  }

  schema {
    query: Query
  }
`;
