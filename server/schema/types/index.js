module.exports = `
  # A date timestamp in Javascript Date.getTime() format
  scalar Date

  # A user of the application
  type User
  {
    id: Int! # ! means is mandatory
    username: String!
    createdAt: Date
  }

  # Basic entity in the system with common fields
  interface Entity {
    id: Int!
  }

  # Things created by user
  interface CreatedEntity {
    createdAt: Date!
    author: User!
  }

  # Things editable by user
  interface EditableEntity {
    lastEditedAt: Date
    lastEditor: User
  }

  # Things that can be soft-deleted
  interface Deletable {
    deleted: Boolean
  }

  # Comment to a card by another board user
  type Comment implements Entity {
    id: Int!
    commentText: String
    createdAt: Date
    author: User # Comment author
  }

  # A task or feature placed in a board lane
  type Card {
    id: Int!
    title: String
    description: String
    displayOrder: Int
    author: User
    createdAt: Date!
    editedAt: Date
    comments: [Comment] # Comments on the card
  }

  # A vertical lane/column in your board, works as
  # a card holder and represent the possible states of a card
  type Lane {
    id: Int!
    title: String!
    displayOrder: Int!
    cards: [Card]
  }

  # A collection of lanes and cards (states and tasks/features)
  type Board {
    id: Int!
    name: String
    isPublic: Boolean
    owner: User
    lanes: [Lane]
    # Users participating in this board
    members: [User]
    createdAt: Date
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
