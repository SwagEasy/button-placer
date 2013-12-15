$(window).load(function () {
  var placer = new ButtonPlacer([
    new SizeRater({
      minWidth: 0.1,
      maxWidth: 0.5,
      minHeight: 0.1,
      maxHeight: 0.5
    })
  ]);

  placer.getTopElements();
});