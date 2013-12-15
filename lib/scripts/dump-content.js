/**
 * This scripts just dumps the content of a web page on the standard output.
 * You should run this script through PhantomJS.
 *
 * It's dumb and silent, but kinda-sorta-okay for a prototype.
 */

var page = require('webpage').create(),
    CONFIG = require('../config'),
    system = require('system'),
    url, content;

function includeSDK(doc, CONFIG) {
  var dependencies = CONFIG.DEPENDENCIES,
      sibling = doc.documentElement.childNodes[0],
      script;
  dependencies.forEach(function (dependency) {
    script = doc.createElement('script');
    script.src = dependency;
    sibling.parentNode.insertBefore(script, sibling);
  });
}

if (url = system.args[1]) {
  page.open(url, function(status) {

    if (status === 'success') {

      var SwagEasy = {
        PAGE_URL: url,
        includeSDK: includeSDK.toString(),
        CONFIG: CONFIG
      };

      content = page.evaluate(function(SwagEasy) {
        SwagEasy.includeSDK = eval('[' + SwagEasy.includeSDK + ']')[0];
        SwagEasy.includeSDK(document, SwagEasy.CONFIG);
        var head = (document.getElementsByTagName('head') || [])[0];
        if (head) {
          head.insertAdjacentHTML('afterbegin', '<base href="' + SwagEasy.PAGE_URL + '"></base>');
        }
        return document.documentElement.outerHTML;
      }, SwagEasy);

      console.log(content);
      phantom.exit();
    }
  });
}