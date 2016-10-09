var Board = require('./board'),
    Lane = require('./lane'),
    Card = require('./card'),
    Comment = require('./comment'),
    User = require('./user'),
    customTypes = require('./customTypes'),
    interfaces = require('./interfaces'),
    Query = require('./query'),
    Mutation = require('./mutation');

const schema = `
schema {
  query: Query
  mutation: Mutation
}
`;


module.exports = [
  customTypes, interfaces,
  Board, Lane, Card, Comment, User,
  Query, Mutation,
  schema
];
