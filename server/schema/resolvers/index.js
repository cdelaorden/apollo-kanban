var Date = require('./date'),
    common = require('./common')
    board = require('./board'),
    boardMember = require('./board_member'),
    lane = require('./lane'),
    card = require('./card'),
    query = require('./query');

function ResolverFactory(boardService, laneService, cardService, commentService, userService){

  return {
    //Custom scalar type
    Date,
    //the schema itself
    Query: query(common, boardService),
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
