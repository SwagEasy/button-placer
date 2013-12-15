function VisibilityRater() {};

VisibilityRater.prototype.rate = function (el) {
  return el.is(':visible') ? 100 : 0;
};
