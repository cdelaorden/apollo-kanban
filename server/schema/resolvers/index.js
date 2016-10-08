var userResolver = require('./user');

function ResolverFactory(boardService, laneService, cardService, commentService, userService){
  return {
    Query: {
      boards (_, args, context){
        //fetch all boards for current user
        return boardService.getForUser(context.user.id);
      },

      board( _, { id }, context){
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
      lanes(parent, args, context){
        return laneService.getAllByBoard(context.user.id, parent.id);
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
      cards (parent, args, context){
        return cardService.getByLane(context.user.id, parent.id);
      }
    },
    Card: {
      author(parent, args, context){
        return context.loaders.users.load(parent.authorId);
      },
      comments(parent, args, context){
        return commentService.getByCard(context.user.id, parent.id);
      }
    },
    Comment: {
      author(parent, args, context){
        return context.loaders.users.load(parent.authorId);
      }
    }
  };
}

module.exports = ResolverFactory;
