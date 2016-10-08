var kontainer = require('./config/containerConfig');


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
    })
  }
  return user
})
.then(u => {
  console.log('Use admin user to login!');
})