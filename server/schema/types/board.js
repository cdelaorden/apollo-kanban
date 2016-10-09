module.exports = `
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
`;