function ButtonPlacer(raters, button) {
  this.button = button;
  this.raters = raters;
  this.rates = {};

  var counter = 1;
  $('*').each(function () {
    if (!this.id) {
      this.id = 'se-' + counter;
      counter += 1;
    }
  });
}

ButtonPlacer.DEFAULT_BUTTONS_COUNT = 5;
ButtonPlacer.MIN_RATING = 200;

ButtonPlacer.prototype.getTargetElements = function (node) {
  var nodes = [];

  function getTextNodes(node) {
    if (node.nodeType == 3) {
      nodes.push(node.parentNode);
    } else {
      for (var i = 0, len = node.childNodes.length; i < len; ++i) {
        getTextNodes(node.childNodes[i]);
      }
    }
  }
  getTextNodes(node);
  return nodes;
};

ButtonPlacer.prototype.getTopElements = function (count) {
  var self = this;
  $.each(this.getTargetElements(document) ,function () {
    var el = this;
    self.rates[el.id] = self.rates[el.id] || 0;
    $.each(self.raters, function () {
      self.rates[el.id] += this.rate($(el));
    });
  });
  _.first(_.sortBy(_.pairs(self.rates), function (el) {
    return el.value;
  }), count || ButtonPlacer.DEFAULT_BUTTONS_COUNT);
};

ButtonPlacer.prototype.placeButton = function (siblings) {
  var self = this;
  $.each(siblings, function () {
    self.button.clone().insertBefore(this);
  });
};