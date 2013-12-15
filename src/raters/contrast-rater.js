function ContrastRater(options) {
  this.options = options;
}

ContrastRater.prototype.hexToRgb = function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};

ContrastRater.prototype.isHex = function (color) {
  return color.toString().indexOf('#') === 0;
};

ContrastRater.prototype.convertToRgb = function (color) {
  if (this.isHex(color)) {
    return this.hexToRgb(color);
  }
  return color;
};

ContrastRater.prototype.rate = function (el) {
  var parentNode = el.parent(),
      background = this.convertToRgb(el.css('background-color')),
      norm = this.options.maxContrast - this.options.minContrast,
      parentBg, diff = 0;
  while (parentNode = parentNode.parent() &&
         _.isEqual(this.convertToRgb(parentNode.css('background-color')), background)) {}
  parentBg = this.convertToRgb(parentNode.css('background-color');
  _.each(_.keys(parentBg), function (k) {
    diff += Math.abs(parentBg[k] - background[k]);
  });
  diff -= this.options.minContrast;
  if (diff <= 0) return 0;
  return (diff / norm) * 100;
};