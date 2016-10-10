module.exports = function (boardService, laneService, cardService, commentService, userService){
  return {
    /* BOARDS */
    createBoard(_, { name }, { user, loaders }){
      return boardService.createBoard(user.id, name)
        .then(boardId => loaders.boards.load(boardId));
    },

    /* LANES */
    createLane(_, { input }, { user, loaders }){
      const { boardId, title, displayOrder } = input;
      return laneService.createLane(user.id, boardId, displayOrder, title)
        .then(([ id ]) => loaders.lanes.load(id));
    },

    /* CARDS */
    //adds a new card to a given board
    addCard(_, { input }, { user, loaders }){      
      return cardService.createCard(user.id, input)
      .then(([ newId ]) =>{
        console.log('Response', newId);
        return loaders.cardLoader.load(newId);
      });
    },

    updateCard(_, { input }, { user, loaders }){
      return cardService.updateCard(user.id, input)
      .then(_ => {
        //clear from cache
        loaders.cardLoader.clear(input.id);
        //refetch from server
        return loaders.cardLoader.load(input.id);
      });
    },    

    removeCard(_, { id }, { user, loaders }){
      return cardService.removeCard(user.id, id)
      .then(_ => {
        loaders.cardLoader.clear(id);
        return true;
      })
      .catch(err => {
        console.error('removeCard error', err);
        return false;
      })
    },

    /* COMMENTS */

    



  }
}