var bogart = require('bogart'),
    cp = require('child_process'),
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