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
};
