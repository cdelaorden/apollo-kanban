function createBoardResolver({ author, lastEditor, deleted }, userService){
  return {
      author,
      lastEditor,
      deleted,
      lanes(parent, args, { user, loaders  }){
        return loaders.lanesByBoard.load(parent.id);
      },
      members(parent, args, { user, loaders }){
        return userService.getMembersForBoard(parent.id)
          .tap(users => {
            //cache users
            users.forEach(user => {
              loaders.users.prime(user.id, user);
            });
          });
      }
  }
}

module.exports = createBoardResolver;