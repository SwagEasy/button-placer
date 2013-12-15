function SizeRater(options) {
  this.options = options;
  var winWidth = $(window).width(),
      winHeight = $(window).height(),
  this.maxWidth = options.maxWidth * winWidth,
  this.maxHeight = options.maxHeight * winHeight,
  this.minWidth = options.minWidth * winWidth,
  this.minHeight = options.minHeight * winHeight;
}

SizeRater.prototype.rate = function (el) {
  var width = el.width(),
      height = el.height(),
      normElWidth = width - this.minWidth,
      normElHeight = height - this.minHeight,
      normWidth = this.maxWidth - this.minWidth,
      normHeight = this.maxHeight - this.minHeight;

  if (normElHeight < 0) normElHeight = 0;
  if (normElWidth < 0) normElWidth = 0;
  if (normElHeight > normHeight) normElHeight = normHeight;
  if (normElWidth > normWidth) normElWidth = normWidth;

  return ((normElHeight / normHeight) * 100 + (normElWidth / normWidth) * 100) / 2;
};