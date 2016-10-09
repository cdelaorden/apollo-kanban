module.exports = function cardResolver({ author, lastEditor, deleted }, dateFormats){
  const { createdAtISO, createdAtGMT } = dateFormats;
  return {
    author,
    lastEditor,
    deleted,
    createdAtISO,
    createdAtGMT,
    comments(parent, args, { loaders, user }){
      return loaders.commentsByCard.load({ id: parent.id, limit: 100 });
    }
  }
}