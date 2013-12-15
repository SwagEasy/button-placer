function ButtonPlacer(raters) {
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

ButtonPlacer.prototype.getTopElements = function (count) {
  var self = this;
  $('*').each(function () {
    var el = this;
    self.rates[el.id] = self.rates[el.id] || 0;
    $.each(this.raters, function () {
      self.rates[el.id] += this.rate(el);
    });
  });
  _.first(_.sortBy(_.pairs(self.rates), function (el) {
    return el.value;
  }), count || ButtonPlacer.DEFAULT_BUTTONS_COUNT);
};

ButtonPlacer.prototype.placeButton = function () {
  
};