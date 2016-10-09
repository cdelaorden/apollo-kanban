module.exports = {
  createdAtISO (parent){
    return parent.createdAt.toISOString()
  },
  createdAtGMT (parent){
    return parent.createdAt.toGMTString()
  }
}