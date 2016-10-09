var Board = require('./board'),
    Lane = require('./lane'),
    Card = require('./card'),
    Comment = require('./comment'),
    User = require('./user'),
    customTypes = require('./customTypes'),
    interfaces = require('./interfaces'),
    Query = require('./query');


const schema = `
schema {
  query: Query
}
`;


module.exports = [
  customTypes, interfaces,
  Board, Lane, Card, Comment, User, Query,
  schema
];
