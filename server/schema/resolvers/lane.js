module.exports = function({ author, lastEditor, deleted }, dateFormats){
  const { createdAtISO, createdAtGMT } = dateFormats;
  return {
    author,
    lastEditor,
    deleted,
    createdAtISO,
    createdAtGMT,
    cards (parent, args, { loaders, user }, { fieldASTs }){
      return loaders.cardsByLane.load(parent.id);
    }
  }
}