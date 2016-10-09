/** Returns a User object from an entity authorId */
function author(parent, args, { loaders }){
  return loaders.users.load(parent.authorId);
}

/** Returns a User object from an entity's lastEditedById */
function lastEditor(parent, args, { loaders }){
  return parent.lastEditorId ?
    loaders.users.load(parent.lastEditorId) :
    null;
}

/** Returns a deleted Boolean from a SQL bit */
function deleted(parent){
  return parent.deleted === 1;
}

module.exports = {
  author,
  lastEditor,
  deleted
}