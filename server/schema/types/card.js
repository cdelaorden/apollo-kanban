module.exports = `
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
`;