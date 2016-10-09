module.exports = function({ author, lastEditor, deleted }){
  return {
    author,
    lastEditor,
    deleted,
    cards (parent, args, { loaders, user }, { fieldASTs }){
      return loaders.cardsByLane.load(parent.id);
    }
  }
}