var DataLoader = require('dataloader');

function LoadersFactory(BoardService, LaneService, CardService, CommentService, UserService){

    function makeBoardLoader(userId){
      return new DataLoader(ids => {
        return BoardService.getManyById(userId, ids);
      });
    }

    function makeLaneLoader(userId){
      return new DataLoader(ids => {
        return LaneService.getManyById(userId, ids);
      });
    }

    function makeCardLoader(userId){
      return new DataLoader(ids => CardService.getManyById(userId, ids));
    }

    function makeCommentLoader(userId){
      return new DataLoader(ids => CommentService.getManyById(userId, ids));
    }

    function makeUserLoader(){
      return new DataLoader(ids => UserService.getManyById(ids));
    }

    return {
      createLoaders: (user) => {
        var userId = user.id || 1;
        return {
          boards: makeBoardLoader(userId),
          lanes: makeLaneLoader(userId),
          cards: makeCardLoader(userId),
          comments: makeCommentLoader(userId),
          users: makeUserLoader()
        }
      }
    }

}

module.exports = LoadersFactory;