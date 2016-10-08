var { apolloExpress, graphiqlExpress } = require('apollo-server');
var bodyParser = require('body-parser');


function GraphQLServerFactory(schema, loaders, webserver){

  //TODO: validate & extract JSON web token
  webserver.app.use('/graphql', bodyParser.json(), apolloExpress(req => {
    req.user || (req.user = { id: 1, username: 'admin' });
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