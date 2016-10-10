var DataLoader = require('dataloader');

function LoadersFactory(BoardService, LaneService, CardService, CommentService, UserService){

    function makeBoardLoader(userId){
      return new DataLoader(ids => {
        console.log('BoardLoader.load', ids);
        return BoardService.getManyById(userId, ids);
      });
    }


    function makeLanesByBoardLoader(userId){
      return new DataLoader(boardIds => {
        console.log('LanesByBoardLoader.load', boardIds);
        //return an array of arrays (lanes per board)
        //result must match the key array length
        return LaneService.getAllByBoard(userId, boardIds)
        .then(lanes => {
          return boardIds.map(boardId => {
            return lanes.filter(lane => lane.boardId === boardId);
          });
        });
      });
    }

    function makeLaneLoader(userId){
      return new DataLoader(ids => {
        return LaneService.getManyById(userId, ids);
      });
    }

    function makeCardsByLaneLoader(userId){
      return new DataLoader(laneIds => {
        console.log('CardsByLane.load', laneIds);
        //array of card arrays per lane
        return CardService.getManyByLanes(userId, laneIds)
        .then(cards => {
          return laneIds.map(laneId => {
          return cards.filter(card => card.laneId === laneId);
          });
        })
      });
    }

    function makeCardLoader(userId){
      return new DataLoader(ids => {
        return CardService.getManyById(userId, ids);
      })
    }

    function makeCommentsByCardLoader(userId){
      return new DataLoader((cardIds) => {
        console.log('CommentsByCard.load', cardIds);
        //array of comment array by card
        return CommentService.getManyByCards(userId, cardIds.map(x => x.id))
        .then(comments => cardIds.map(cardId =>
          comments.filter(comment => comment.cardId === cardId.id))
        );
      },
      //dataloader options
      {
        //example using a complex key and extract it to use for cache
        //custom key function to extract real IDs from keys
        cacheKeyFn: function(key){
          console.log('CacheFnKey', key);
          return key.id
        }
      });
    }

    function makeUserLoader(){
      return new DataLoader(ids => {
        console.log('UserLoader.load', ids);
        return UserService.getManyById(ids)
      });
    }

    function makeAuthorsByComment(){
      return new DataLoader(commentIds => {
        console.log('AuthorsByComment.load', commentIds);
        return UserService.getManyByComments(commentIds)
      });
    }

    return {
      /**
       * Return a function that will create all loaders
       * with a closure on the current userId (for permissions and stuff)
       *
       * This will be executed for every request, so every client gets
       * its own cache
       * */
      createLoaders: (user) => {
        var userId = user.id || 1;
        return {
          boards: makeBoardLoader(userId),
          lanes: makeLaneLoader(userId),
          lanesByBoard: makeLanesByBoardLoader(userId),
          cardsByLane: makeCardsByLaneLoader(userId),
          cardLoader: makeCardLoader(userId),
          commentsByCard: makeCommentsByCardLoader(userId),
          authorsByComment: makeAuthorsByComment(),
          users: makeUserLoader(),
        }
      }
    }

}

module.exports = LoadersFactory;