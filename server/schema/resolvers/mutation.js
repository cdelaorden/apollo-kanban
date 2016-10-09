module.exports = function (boardService, laneService, cardService, commentService, userService){
  return {
    addCard(_, { input }, { user, loaders }){
      console.log('addCard', input);
      return cardService.createCard(user.id, input)
      .then(([ newId ]) =>{
        console.log('Response', newId);
        return loaders.cardLoader.load(newId);
      });
    }
  }
}