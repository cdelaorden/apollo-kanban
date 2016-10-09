
function CommentServiceFactory(db){
  /* Returns a single comment by id */
  function getByCard(userId, cardId){
    return db('Comment')
      .select('Comment.*')
      .innerJoin('Card', 'Comment.cardId', 'Card.id')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Board.id', 'Lane.boardId')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      //user has access to this board
      .where('BoardMember.userId', userId)
      .where({ cardId })
      .orderBy('createdAt', 'DESC')
      .map(comment => Object.assign({},
        comment,
        { createdAt: comment.createdAt.getTime() },
        { text: comment.commentText }
      ));
  }

  function getManyById(userId, ids){
    return db('Comment')
      .select('Comment.*')
      .innerJoin('Card', 'Comment.cardId', 'Card.id')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Board.id', 'Lane.boardId')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      //user has access to this board
      .where('BoardMember.userId', userId)
      .whereIn('id', ids)
      .orderBy('createdAt')
  }

  function getManyByCards(userId, cardIds = []){
    return db('Comment')
      .select('Comment.*')
      .innerJoin('Card', 'Comment.cardId', 'Card.id')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Board.id', 'Lane.boardId')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      //user has access to this board
      .where('BoardMember.userId', userId)
      .whereIn('Card.id', cardIds)
      .orderBy('createdAt')
  }

  /** Returns the N most recents comments on a board */
  function getRecentByBoard(userId, boardId, limit = 10){
    return db('Comment')
      .select('Comment.*')
      .innerJoin('Card', 'Comment.cardId', 'Card.id')
      .innerJoin('Lane', 'Card.laneId', 'Lane.id')
      .innerJoin('Board', 'Board.id', 'Lane.boardId')
      .innerJoin('BoardMember', 'BoardMember.boardId', 'Board.id')
      //user has access to this board
      .where('BoardMember.userId', userId)
      .orderBy('Comment.createdAt', 'DESC')
      .limit(limit);

  }

  return {
    getByCard,
    getManyById,
    getManyByCards,
    getRecentByBoard
  }
}

module.exports = CommentServiceFactory;