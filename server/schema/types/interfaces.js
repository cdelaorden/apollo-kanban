module.exports = `
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
`;
