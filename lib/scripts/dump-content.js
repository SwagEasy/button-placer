/**
 * This scripts just dumps the content of a web page on the standard output.
 * You should run this script through PhantomJS.
 *
 * It's dumb and silent, but kinda-sorta-okay for a prototype.
 */

var page = require('webpage').create(),
    CONFIG = require('../config'),
    system = require('system'),
    url,
    content;

function includeSDK(doc, CONFIG) {
  var dependencies = CONFIG.DEPENDENCIES,
      sibling = doc.documentElement.childNodes[0],
      script;
  dependencies.forEach(function (dependency) {
    script = doc.createElement('script');
    script.src = 'src/' + dependency;
    sibling.parentNode.insertBefore(script, sibling);
  });
}

if (url = system.args[1]) {
  page.open(url, function(status) {
    if (status === 'success') {
      content = page.evaluate(function(includeSDK, CONFIG) {
        includeSDK(document, CONFIG);
        return document.documentElement.outerHTML;
      }, includeSDK, CONFIG);

      console.log(content);

      phantom.exit();
    }
  });
}