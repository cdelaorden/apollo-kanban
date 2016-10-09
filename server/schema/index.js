var { makeExecutableSchema, addErrorLoggingToSchema } = require('graphql-tools');

module.exports = function(types, resolvers){
  //HACK - inject the logger as dep too!
  const logger = { log: (e) => console.error(e) }

  let schema = makeExecutableSchema({
    typeDefs: types,
    resolvers: resolvers
  });

  addErrorLoggingToSchema(schema, logger);

  return schema;
}