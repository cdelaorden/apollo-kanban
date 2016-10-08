var kontainer = require('kontainer-di'),
    httpConfig = require('./http'),
    knexfile = require('./knexfile');



kontainer.register('httpConfig', [], httpConfig);
kontainer.register('dbConfig', [], knexfile);
kontainer.register('db', ['dbConfig'], require('../services/db'));

//services
kontainer.register('user', ['db'], require('../services/user'));
kontainer.register('jwtService', ['httpConfig'], require('../services/jwt'));
kontainer.register('board', ['db'], require('../services/board'));
kontainer.register('lane', ['db'], require('../services/lane'));
kontainer.register('card', ['db'], require('../services/card'));
kontainer.register('comment', ['db'], require('../services/comment'));

//GQL stuff
kontainer.register('resolvers', [
    'board',
    'lane',
    'card',
    'comment',
    'user'
], require('../schema/resolvers'));
kontainer.register('loaders', [
    'board',
    'lane',
    'card',
    'comment',
    'user'
], require('../modules/gql-server/loaders'));
kontainer.register('schema', ['resolvers'], require('../schema/index'));

//modules
kontainer.register('webserver', ['httpConfig'], require('../modules/webserver'));
kontainer.register('gqlserver', ['schema', 'loaders', 'webserver'],
    require('../modules/gql-server'));

module.exports = kontainer;