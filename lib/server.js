var bogart = require('bogart'),
    cp = require('child_process'),
    router = bogart.router();

router.get('/', function (req) {
  var res = bogart.res();
  asyncStuff(function () {
    res.status(200);
    res.send(message);
    res.end();
  });
  return res;
});

exports.run = function () {
  var app = bogart.app();
  app.use(bogart.batteries);
  app.use(router);
  app.start();
};