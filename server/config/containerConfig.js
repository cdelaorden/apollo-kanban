var kontainer = require('kointainer-di'),
    httpConfig = require('./http'),
    knexfile = require('./knexfile');

var knex = require('knex')(knexfile);

kontainer.register('httpConfig', [], httpConfig);
kontainer.register('db', [], knex);

//services
kontainer.register('userService', ['db'], require('../services/user'));
kontainer.register('jwtService', ['httpConfig'], require('../services/jwt'));

//modules
kontainer.register('webserver', ['httpConfig'], require('../modules/webserver'));



return kontainer;