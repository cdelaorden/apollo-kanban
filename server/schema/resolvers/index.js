var userResolver = require('./user');
var { Kind } = require('graphql/language')

function ResolverFactory(boardService, laneService, cardService, commentService, userService){
  return {
    //Custom scalar type
    Date: {
      __parseValue(value) {
        return new Date(value); // value from the client
      },
      __serialize(value) {
        return value.getTime(); // value sent to the client
      },
      __parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
          return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
      },
    },
    //the schema itself
    Query: {
      boards (_, args, { user, loaders }){
        //fetch all boards for current user
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
    Board: {
      owner (parent, args, context){
        return context.loaders.users.load(parent.ownerId)
      },
      lanes(parent, args, { user, loaders  }, { fieldASTs }){
        //console.log('Board.lanes', fieldASTs)
        return loaders.lanesByBoard.load(parent.id);
        //return laneService.getAllByBoard(user.id, parent.id);
      },
      members(parent, args, context){
        return userService.getMembersForBoard(parent.id)
          .tap(users => {
            //cache users
            users.forEach(user => {
              context.loaders.users.prime(user.id, user);
            });
          });
      },
    },
    Lane: {
      cards (parent, args, { loaders, user }, { fieldASTs }){
        //console.log('Resolving cards for lane', fieldASTs);
        return loaders.cardsByLane.load(parent.id);
        //return cardService.getByLane(context.user.id, parent.id);
      }
    },
    Card: {
      author(parent, args, { loaders }){
        return loaders.users.load(parent.authorId);
      },
      comments(parent, args, { loaders, user }){
        return loaders.commentsByCard.load(parent.id);
      }
    },
    Comment: {
      author(parent, args, { loaders }){
        return loaders.users.load(parent.authorId);
      }
    }
  };
}

module.exports = ResolverFactory;
