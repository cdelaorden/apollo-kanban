var { apolloExpress, graphiqlExpress } = require('apollo-server');
var bodyParser = require('body-parser');

function GraphQLServerFactory(schema, loaders, webserver){

  //TODO: validate & extract JSON web token for authentication and hydrate req.user!!!
  //**********************************************************************************
  webserver.app.use('/graphql', bodyParser.json(), apolloExpress(req => {
    console.log('GraphQL request\n\n');
    req.user || (req.user = { id: 2, username: 'admin' });
    var context = {
      user: req.user,
      loaders: loaders.createLoaders(req.user)
    }
    return {
      schema,
      context
    }
  }));

  webserver.app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  return {}
}

module.exports = GraphQLServerFactory;