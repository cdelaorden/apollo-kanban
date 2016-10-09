module.exports = function(common, boardService){
  return {
    boards (_, args, { user, loaders }){
      //fetch all boards for current user
      console.log('Board.getForUser', user.id);
      return boardService.getForUser(user.id)
      .tap(boards => {
        boards.forEach(board => {
          loaders.boards.prime(board.id, board);
        })
      })
    },

    board (_, { id }, { loaders, user }){
      return loaders.boards.load(id);
    },

    card (_, { id }, { loaders, user }){
      return loaders.cardLoader.load(id);
    },

    me (_, args, context){
      return context.loaders.users.load(context.user.id);
    }
  }
}