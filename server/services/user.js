var bcrypt = require('bcryptjs');

function UserServiceFactory(db){

  function encryptPassword(pwd){
    return new Promise((res, rej) => {
      bcrypt.genSalt(10, (err, salt) => {
        if(err) return rej(err);
        bcrypt.hash(pwd, salt, (err, hash) => {
          return err ? rej(err) : res(hash);
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
    return db('User')
      .select('id', 'username')
      .where({ id }).first();
  }

  function getManyById(ids = []){
    return db('User')
      .select('id','username')
      .whereIn('id', ids)
  }

  function getByUsername(username){
    return db('User')
      .select('id', 'username', 'password', 'createdAt')
      .where({ username }).first();
  }

  function getMembersForBoard(boardId){
    return db('User')
      .select('User.id', 'User.username', 'BoardMember.boardId', 'BoardMember.isAdmin')
      .innerJoin('BoardMember', 'BoardMember.userId', 'User.id')
      .where('BoardMember.boardId', boardId);
  }

  function getManyByComments(commentIds = []){
    return db('User')
      .select('User.id', 'User.username')
      .innerJoin('Comment', 'Comment.authorId', 'User.id')
      .whereIn('Comment.id', commentIds);
  }

  function create(newUser){
    return checkUsername(newUser.username)
    .then(ok => encryptPassword(newUser.password))
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
    return getByUsername(username)
    .then(user => {
      if(user){
        throw new Error('Username already in use');
      }
      return true;
    });
  }

  return {
    getById,
    getManyById,
    getByUsername,
    getMembersForBoard,
    getManyByComments,
    login,
    create,
    checkUsername
  }
}

module.exports = UserServiceFactory;