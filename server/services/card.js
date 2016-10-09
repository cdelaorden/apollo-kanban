
function CardServiceFactory(db){

  /** Returns a card by id */
  function getById(userId, id){
    return db('Card')
      .select('Card.*')
      //user has access to the board this card appears on
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .where({ id })
      .first();
  }

  function getManyById(userId, ids = []){
    return db('Card')
      .select('Card.*')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .whereIn('Card.id', ids);
  }

  /** Returns all cards in a given lane */
  function getByLane(userId, laneId){
    return db('Card')
      .select('Card.*')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .where('Card.laneId', laneId)
      .orderBy('displayOrder');
  }

  function getManyByLanes(userId, laneIds = []){
    return db('Card')
      .select('Card.*')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .whereIn('Card.laneId', laneIds)
      .orderBy('displayOrder');
  }

  /** Returns all cards in a board, sorted by laneId and displayOrder */
  function getByBoard(userId, boardId){
    return db('Card')
      .select('Card.*')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .where('Lane.boardId', boardId)
      .orderBy('laneId', 'displayOrder');
  }

  function createCard(userId, { boardId, laneId, title}){
    console.log('createCard', userId, boardId, laneId, title)
    return db('Card').max('displayOrder as maxOrder').where({ laneId }).first()
      .then(function({ maxOrder }){
        console.log('maxOrder', maxOrder);
        return db('Card')
        .insert({
          authorId: userId,
          title,
          laneId,
          displayOrder: maxOrder + 1
        },
        //return the new id!
        'id');
      });
  }

  return {
    getById,
    getManyById,
    getManyByLanes,
    getByLane,
    getByBoard,
    createCard
  }
}

module.exports = CardServiceFactory;