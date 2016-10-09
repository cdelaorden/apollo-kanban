module.exports = function cardResolver({ author, lastEditor, deleted }){
  return {
    author,
    lastEditor,
    deleted,
    comments(parent, args, { loaders, user }){
      return loaders.commentsByCard.load({ id: parent.id, limit: 100 });
    },
  }
}