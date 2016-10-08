
function CardServiceFactory(db){

  /** Returns a card by id */
  function getById(userId, id){
    return db('Card')
      .select('Card.*')
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
      .whereIn('id', ids);
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

  return {
    getById,
    getManyById,
    getByLane,
    getByBoard
  }
}

module.exports = CardServiceFactory;