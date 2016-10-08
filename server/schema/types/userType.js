module.exports = `
  type User {
    id: Int! # ! means is mandatory
    name: String!
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
    author: User
    comments: [Comment]
  }

  type Lane {
    id: Int!
    name: String!
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
`;
