var express = require('express');

function WebServerFactory(httpConfig){
  var app = express();

  function start(){
    app.listen(httpConfig.port || 3000, (err) => {
      if(err) throw err;
      console.log('WebApp listening on ', httpConfig.port || 3000);
    })
  }

  return {
    start,
    app
  }

}

module.exports = WebServerFactory;