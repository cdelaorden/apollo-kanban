module.exports = `
  # A date timestamp in Javascript Date.getTime() format
  scalar Date

  # A user of the application
  type User implements Deletable
  {
    id: Int! # ! means is mandatory
    username: String!
    createdAt: Date
    deleted: Boolean
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
  type Comment implements Entity, CreatedEntity, EditableEntity, Deletable {
    id: Int!
    commentText: String
    createdAt: Date!
    author: User!
    lastEditedAt: Date
    lastEditor: User
    deleted: Boolean
  }

  # A task or feature placed in a board lane
  type Card implements Entity, CreatedEntity, EditableEntity, Deletable {
    id: Int!
    title: String
    description: String
    displayOrder: Int
    author: User!
    createdAt: Date!
    lastEditor: User
    lastEditedAt: Date
    deleted: Boolean
    comments: [Comment] # Comments on the card
  }

  # A vertical lane/column in your board, works as
  # a card holder and represent the possible states of a card
  type Lane implements Entity, CreatedEntity, EditableEntity, Deletable{
    id: Int!
    title: String!
    displayOrder: Int!
    author: User!
    createdAt: Date!
    lastEditor: User
    lastEditedAt: Date
    deleted: Boolean
    cards: [Card]
  }

  # A collection of lanes and cards (states and tasks/features)
  type Board implements Entity, CreatedEntity, EditableEntity, Deletable {
    id: Int!
    name: String
    isPublic: Boolean
    author: User!
    createdAt: Date!
    lastEditor: User
    lastEditedAt: Date
    deleted: Boolean
    lanes: [Lane]
    # Users participating in this board
    members: [BoardMember]
  }

  type BoardMember {
    user: User!
    board: Board!
    isAdmin: Boolean
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
