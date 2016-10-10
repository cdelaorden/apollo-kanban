module.exports = `
# Data needed to create a new card.
# New card is inserted at the bottom of the lane
input AddCardInput {
  # Board identifier
  boardId: Int!
  # Lane identifier
  laneId: Int!
  # Card title
  title: String!
}

input AddLaneInput {
  boardId: Int!
  title: String!
  displayOrder: Int!
}

input UpdateCardInput {
  id: Int!
  title: String
  displayOrder: Int
  description: String
}

input AddCommentInput {
  cardId: Int!
  commentText: String!
}

input UpdateCommentInput {
  id: Int!
  commentText: String!
}

type Mutation {
  createBoard(name:String!): Board
  createLane(input: AddLaneInput): Lane
  addCard(input: AddCardInput): Card
  updateCard(input: UpdateCardInput): Card
  removeCard(id:Int!): Boolean
  # closeBoard(id:Int!): Boolean  
  # removeLane(boardId: Int!, id: Int!): Boolean  
  # addCommentToCard(input: AddCommentInput): Comment
  # updateComment(input: UpdateCommentInput): Comment
  # removeComment(id: Int!): Boolean
}
`;
