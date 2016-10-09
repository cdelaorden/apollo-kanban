function createBoardResolver({ author, lastEditor, deleted }, dateFormats, userService){
  const { createdAtISO, createdAtGMT } = dateFormats;
  return {
      author,
      lastEditor,
      deleted,
      createdAtISO,
      createdAtGMT,
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