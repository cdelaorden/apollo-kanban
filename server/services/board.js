
function BoardServiceFactory(db){
  /** Returns all boards a user has access to */
  function getForUser(userId){
    return db('Board')
      .select('Board.*')
      .innerJoin('BoardMember', 'Board.id', 'BoardMember.boardId')
      .where('BoardMember.userId', userId);
  }

  /** Returns a single board by id */
  function getById(userId, id){
    return db('Board')
      .select('Board.*')
      .innerJoin('BoardMember', 'Board.id', 'BoardMember.boardId')
      .where('BoardMember.userId', userId)
      .where({ id }).first();
  }

  function getManyById(userId, ids = []){
     return db('Board')
      .select('Board.*')
      .innerJoin('BoardMember', 'Board.id', 'BoardMember.boardId')
      .where('BoardMember.userId', userId)
      .whereIn('id', ids);
  }

  /** Returns all boards the user has access to where
   * name matches provided name pattern */
  function search(userId, name){
    return db('Board')
      .select('Board.*')
      .innerJoin('BoardMember', 'Board.id', 'BoardMember.boardId')
      .where('BoardMember.userId', userId)
      .where('Board.name', 'LIKE', `%${name}%`);
  }

  return {
    getById,
    getManyById,
    getForUser,
    search
  }
}

module.exports = BoardServiceFactory;