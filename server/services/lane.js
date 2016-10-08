
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
  function getAllByBoard(userId, boardId){
    return db('Lane')
      .select('Lane.*')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .where('Lane.boardId', boardId);
  }

  function getManyById(userId, ids){
    return db('Lane')
      .select('Lane.*')
      .innerJoin('Board', 'Lane.boardId', 'Board.id')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      .where('BoardMember.userId', userId)
      .whereIn('id', ids);
  }


  return {
    getById,
    getManyById,
    getAllByBoard
  }
}

module.exports = LaneServiceFactory;