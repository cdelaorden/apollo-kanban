module.exports = `
# A user of the application
type User implements Deletable
{
  id: Int! # ! means is mandatory
  username: String!
  createdAt: Date
  createdAtISO: String!
  createdAtGMT: String!
  deleted: Boolean
}

type BoardMember {
  user: User!
  board: Board!
  isAdmin: Boolean
}
`;
