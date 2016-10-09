var Date = require('./date'),
    dateFormats = require('./date_formats'),
    common = require('./common')
    board = require('./board'),
    boardMember = require('./board_member'),
    lane = require('./lane'),
    card = require('./card'),
    query = require('./query'),
    mutation = require('./mutation');

function ResolverFactory(boardService, laneService, cardService, commentService, userService){
  const { createdAtISO, createdAtGMT } = dateFormats;
  return {
    //Custom scalar type
    Date,
    //the schema itself
    Query: query(common, boardService),
    Mutation: mutation(boardService, laneService, cardService, commentService, userService),
    Board: board(common, dateFormats, userService),
    BoardMember: boardMember(common, dateFormats),
    Lane: lane(common, dateFormats),
    Card: card(common, dateFormats),
    Comment: {
      author: common.author,
      lastEditor: common.lastEditor,
      deleted: common.deleted,
      createdAtISO,
      createdAtGMT
    },
    User: {
      deleted: common.deleted
    }
  };
}

module.exports = ResolverFactory;
