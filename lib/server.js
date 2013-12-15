var page = require('webpage').create(),
    bogart = require('bogart'),
    router = bogart.router();

router.get('/', function (req) {
  return req.params.url;
});

exports.run = function () {
  var app = bogart.app();
  app.use(bogart.batteries);
  app.use(router);
  app.start();
<<<<<<< HEAD
};
=======
};
>>>>>>> 52965210687f98a96874dc46cbc621a6c14266ad
