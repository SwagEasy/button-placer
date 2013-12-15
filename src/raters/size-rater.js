function SizeRater(options) {
  this.options = options;
  var winWidth = $(window).width(),
      winHeight = $(window).height();
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
      normElArea = normElHeight * normElWidth,
      normWidth = this.maxWidth - this.minWidth,
      normHeight = this.maxHeight - this.minHeight,
      normArea = normWidth * normHeight;

  if (normElArea < 0) normElArea = 0;
  if (normElArea > normArea) normElArea = normArea;

  return (normElArea / normArea) * 100;
};