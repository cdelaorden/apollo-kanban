
function LaneServiceFactory(db){
  /** Returns a lane by id
   * @param {Number}  id  lane identifier
   * @returns {Promise}
   * */
  function getById(userId, id){
    return db('Lane')
      .select('Lane.*')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .where({ id }).first();
  }

  /**
   * Returns all lanes in a boardId
   * @param {Number}  boardId Board identifier
   * */
  function getAllByBoard(userId, boardIds = []){
    return db('Lane')
      .select('Lane.*')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .whereIn('Lane.boardId', boardIds);
  }

  function getManyById(userId, ids){
    return db('Lane')
      .select('Lane.*')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .whereIn('Lane.id', ids);
  }

  function createLane(userId, boardId, displayOrder, title){
    return db('Lane')
      .insert({
        authorId: userId,
        title,
        displayOrder,
        boardId
      }, 'id');
  }


  return {
    getById,
    getManyById,
    getAllByBoard,
    createLane
  }
}

module.exports = LaneServiceFactory;