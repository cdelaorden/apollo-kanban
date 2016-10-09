module.exports = `
type Query {
  # All boards available to the logged in user
  boards: [Board]
  # A single board the user has access to
  board(id: Int!): Board
  # A single card the user has access to
  card(id: Int!): Card
  # Logged in user info
  me: User
}
`;