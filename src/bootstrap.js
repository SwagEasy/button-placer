$(window).load(function () {
  var placer = new ButtonPlacer([
    new SizeRater({
      minWidth: 0.01,
      maxWidth: 0.05,
      minHeight: 0.01,
      maxHeight: 0.05
    })
  ]);

  console.log(placer.getTopElements());
});