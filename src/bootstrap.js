$(window).load(function () {

  var button = $('<button style="background-color: red; color: #fff; border: 1px solid red;">SwagEasy MAN!</button>');

  var placer = window.placer = new ButtonPlacer([
    new SizeRater({
      minWidth: 0.01,
      maxWidth: 0.05,
      minHeight: 0.01,
      maxHeight: 0.05
    }),
    // new ContrastRater({
    //   minContrast: 40,
    //   maxContrast: 500,
    //   parentColorType: 'background-color',
    //   childColorType: 'color'
    // }),
    new ContrastRater({
      minContrast: 40,
      maxContrast: 500,
      parentColorType: 'background-color',
      childColorType: 'background-color'
    }),
    new PriorityRater(),
    new VisibilityRater()
  ], button);

  var positions = placer.getTopElements();

  placer.placeButton(positions);
});
