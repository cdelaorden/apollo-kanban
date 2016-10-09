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
input UpdateCardInput {
  title: String!
  displayOrder: Int!
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
  # createBoard(name:String!): Board
  # closeBoard(id:Int!): Boolean
  # createLane(boardId: Int!, title:String!, displayOrder:Int): Lane
  # removeLane(boardId: Int!, id: Int!): Boolean
  addCard(input: AddCardInput): Card
  # updateCard(card: UpdateCardInput): Card
  # removeCard(id:Int!): Boolean
  # addCommentToCard(input: AddCommentInput): Comment
  # updateComment(input: UpdateCommentInput): Comment
  # removeComment(id: Int!): Boolean
}
`;
