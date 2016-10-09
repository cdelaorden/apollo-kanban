var { makeExecutableSchema, addErrorLoggingToSchema } = require('graphql-tools');
var types = require('./types');

module.exports = function(resolvers){
  const logger = { log: (e) => console.error(e) }
  let schema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
  });

  addErrorLoggingToSchema(schema, logger);
  return schema;
}