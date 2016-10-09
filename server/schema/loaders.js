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
        return LaneService.getAllByBoard(userId, boardIds)
        .then(lanes => {
          return boardIds.map(boardId => {
            return lanes.filter(lane => lane.boardId === boardId);
          });
        });
      });
    }

    function makeCardsByLaneLoader(userId){
      return new DataLoader(laneIds => {
        console.log('CardsByLane.load', laneIds);
        return CardService.getManyByLanes(userId, laneIds)
        .then(cards => {
          return laneIds.map(laneId => {
          return cards.filter(card => card.laneId === laneId);
          });
        })
      });
    }

    function makeCommentsByCardLoader(userId){
      return new DataLoader((cardIds) => {
        console.log('CommentsByCard.load', cardIds);
        return CommentService.getManyByCards(userId, cardIds.map(x => x.id))
        .then(comments => cardIds.map(cardId =>
          comments.filter(comment => comment.cardId === cardId.id))
        );
      },
      //dataloader options
      {
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
      createLoaders: (user) => {
        var userId = user.id || 1;
        return {
          boards: makeBoardLoader(userId),
          lanesByBoard: makeLanesByBoardLoader(userId),
          cardsByLane: makeCardsByLaneLoader(userId),
          commentsByCard: makeCommentsByCardLoader(userId),
          authorsByComment: makeAuthorsByComment(),
          users: makeUserLoader(),
        }
      }
    }

}

module.exports = LoadersFactory;