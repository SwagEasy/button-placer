/**
 * This scripts just dumps the content of a web page on the standard output.
 * You should run this script through PhantomJS.
 *
 * It's dumb and silent, but kinda-sorta-okay for a prototype.
 */

var page = require('webpage').create(),
    system = require('system'),
    url,
    content;

if (url = system.args[1]) {
  page.open(url, function(status) {
    if (status === 'success') {
      content = page.evaluate(function() {
        return document.documentElement.outerHTML;
      });

      console.log(content);

      phantom.exit();
    }
  });
}
