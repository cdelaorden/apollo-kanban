var brcypt = require('bcryptjs');

function UserServiceFactory(db){
  function encryptPassword(pwd){
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return rej(err);
        bcrypt.hash(pwd, salt, (err, hash) => {
          if(err) return rej(err);
          return hash;
        })
      })
    });
  }

  function checkPassword(pwd, hash){
    return new Promise((resolve, reject) => {
      bcrypt.compare(pwd, hash, (err, ok) => {
        return err ? reject(err): resolve(ok);
      });
    })
  }

  function getById(id){
    return db('User').where({ id }).first();
  }

  function getByUsername(username){
    return db('User').where({ username }).first();
  }

  function create(user){
    return checkUsername(user.username)
    .then(_ => encryptPassword(user.password))
    .then(hash => {
      newUser.password = hash;
      return db('User').insert(newUser).return(newUser);
    })
  }

  function login(username, password){
    return getByUsername(username)
    .then(user => {
      if(!user) throw new Error('User not found');
      return checkPassword(password, u.password).then(isEqual => {
        if(!isEqual){
          throw new Error('Wrong password');
        }
        return user;
      });
    });
  }

  function checkUsername(username){
    return getByUsername(username).then(u => {
      if(user){
        throw new Error('Username already in use');
      }
      return true;
    });
  }

  return {
    getById,
    getByUsername,
    login,
    create,
    checkUsername
  }
}

module.exports = UserServiceFactory;