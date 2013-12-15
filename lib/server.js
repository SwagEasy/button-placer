var bogart = require('bogart'),
    spawn = require('child_process').spawn,
    router = bogart.router();

router.get('/', function (req) {
  var res = bogart.res(),
      process;

  process = spawn(__dirname + '/../node_modules/.bin/phantomjs', [
    __dirname + '/scripts/dump-content.js',
    req.params.url
  ]);

  process.stdout.on('data', function (data) {
    res.status(200);
    res.send(data.toString());
  });

  process.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  process.on('close', function () {
    res.send('');
    res.end();
  });

  return res;
});

exports.run = function () {
  var app = bogart.app(),
      root = require('path').join(__dirname, '../');
  console.log(root);
  app.use(bogart.middleware.directory(root));
  app.use(bogart.batteries);
  app.use(router);
  app.start();
};