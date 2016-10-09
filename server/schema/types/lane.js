module.exports = `
# A vertical lane/column in your board, works as
# a card holder and represent the possible states of a card
type Lane implements Entity, CreatedEntity, EditableEntity, Deletable{
  id: Int!
  title: String!
  displayOrder: Int!
  author: User!
  createdAt: Date!
  createdAtISO: String!
  createdAtGMT: String!
  lastEditor: User
  lastEditedAt: Date
  deleted: Boolean
  cards: [Card]
}
`