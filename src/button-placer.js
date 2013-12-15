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
  var inputs = $(':input').toArray();
  return nodes.concat(inputs);
};

ButtonPlacer.prototype.getTopElements = function (count) {
  var self = this,
      result = [];
  $.each(this.getTargetElements(document) ,function () {
    var el = this;
    self.rates[el.id] = self.rates[el.id] || 0;
    $.each(self.raters, function () {
      self.rates[el.id] += this.rate($(el));
    });
  });
  var sortedItems = _.pairs(this.rates).sort(function (a, b) {
    return b[1] - a[1];
  });

  function close(item, items) {
    var winWidth = $(window).width(),
        winHeight = $(window).height(),
        itemOffset = $('#' + item).offset(),
        currentOffset;
    for (var i = 0; i < items.length; i += 1) {
      var el = $('#' + items[i]);
      currentOffset = el.offset();
      if (Math.abs(currentOffset.left - itemOffset.left) / winWidth < 0.1 ||
          Math.abs(currentOffset.top - itemOffset.top) / winHeight < 0.1) {
        return true;
      }
    }
    return false;
  }

  result.push(sortedItems.shift()[0]);
  var itemsLeft = (count || ButtonPlacer.DEFAULT_BUTTONS_COUNT) - 1,
      currentItem;
  while (itemsLeft && (currentItem = sortedItems.shift())) {
    if (!close(currentItem[0], result)) {
      result.push(currentItem[0]);
      itemsLeft -= 1;
    }
  }
  return result;
};

ButtonPlacer.prototype.placeButton = function (siblings) {
  var self = this;
  $.each(siblings, function () {
    self.button.clone().insertAfter($('#' + this));
  });
};