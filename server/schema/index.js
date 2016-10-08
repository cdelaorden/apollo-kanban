var { makeExecutableSchema } = require('graphql-tools');
var types = require('./types');

module.exports = function(resolvers){
  return makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
  });
}