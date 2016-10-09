var kontainer = require('./config/containerConfig');
//for mocking you schema until you have a real DB
//var { mockServer } = require('graphql-tools');


//that's all, launch an express graphql server
kontainer.get('gqlserver');
kontainer.start('webserver');

/**
 * FOR DEVELOPMENT PURPOSES...
 * Call this function on this file to create an admin:admin user for testing
 */
function createAdminAccountIfNeeded(){
  var userService = kontainer.get('userService');
  //create dummy admin:admin account if one does not exists
  userService.getByUsername('admin')
  .then(user => {
    if(!user){
      return userService.create({
        username: 'admin',
        password: 'admin',
        createdAt: new Date(),
        active: true
      }).then(u => u);
    }
    return user
  })
  .then(u => {
    console.log('Use admin/admin user to login!', u);
  })
  .catch(err => {
    console.log('Error', err);
  });
}