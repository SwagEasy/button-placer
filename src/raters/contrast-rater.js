function ContrastRater(options) {
  this.options = options;
}

ContrastRater.prototype.hexToRgb = function (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1
  } : null;
};

ContrastRater.prototype.isHex = function (color) {
  return color.toString().indexOf('#') === 0;
};

ContrastRater.prototype.convertToRgb = function (color) {
  if (!color) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0
    };
  }
  if (this.isHex(color)) {
    return this.hexToRgb(color);
  } else if (typeof color === 'string') {
    color = color.match(/\d+/g)
    color = {
      r: parseInt(color[0], 10),
      g: parseInt(color[1], 10),
      b: parseInt(color[2], 10),
      a: parseInt(color[3], 10) || 1
    };
  }
  return color;
};

ContrastRater.prototype.rate = function (el) {
  var parentNode = el.parent(),
      background = this.convertToRgb(el.css(this.options.childColorType)),
      parentColorType = this.options.parentColorType,
      norm = this.options.maxContrast - this.options.minContrast,
      parentBg, diff = 0;

  if (background.a === 0) return 0;

  while (parentNode &&
        (parentNode = parentNode.parent()) &&
        _.isEqual(this.convertToRgb(parentNode.css(parentColorType)), background)) {}

  parentBg = this.convertToRgb(parentNode.css(parentColorType));
  _.each(_.keys(parentBg), function (k) {
    diff += Math.abs(parentBg[k] - background[k]);
  });
  diff -= this.options.minContrast;
  if (diff <= 0) return 0;
  if (diff > norm) return 100;
  return (diff / norm) * 100;
};