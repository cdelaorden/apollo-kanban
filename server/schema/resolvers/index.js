var Date = require('./date'),
    common = require('./common')
    board = require('./board'),
    boardMember = require('./board_member'),
    lane = require('./lane'),
    card = require('./card');

var { Kind } = require('graphql/language')

function ResolverFactory(boardService, laneService, cardService, commentService, userService){

  return {
    //Custom scalar type
    Date,
    //the schema itself
    Query: {
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

      board(_, { id }, context){
        return context.loaders.boards.load(id);
      },

      me (_, args, context){
        return context.loaders.users.load(context.user.id);
      }
    },
    Board: board(common, userService),
    BoardMember: boardMember(common),
    Lane: lane(common),
    Card: card(common),
    Comment: {
      author: common.author,
      lastEditor: common.lastEditor,
      deleted: common.deleted
    },
    User: {
      deleted: common.deleted
    }
  };
}

module.exports = ResolverFactory;
