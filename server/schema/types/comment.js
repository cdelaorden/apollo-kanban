module.exports = `
# Comment to a card by another board user
type Comment implements Entity, CreatedEntity, EditableEntity, Deletable {
  id: Int!
  commentText: String
  createdAt: Date!
  createdAtISO: String!
  createdAtGMT: String!
  author: User!
  lastEditedAt: Date
  lastEditor: User
  deleted: Boolean
}
`;

