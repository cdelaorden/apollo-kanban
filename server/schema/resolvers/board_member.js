module.exports = () => ({
  user(parent, args, { loaders, user }){
    return loaders.users.load(parent.id);
  },
  board(parent, args, { loaders }){
    return loaders.boards.load(parent.boardId);
  }
});