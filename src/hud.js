const HUD_TITLE = 'You wake up. You look at your blood soaked hands. No no no. Not again...\n',
  HUD_INSTRUCTIONS = 'Find your home planet. The green one. The green arrow shows the way. Avoid the red ports.',
  HUD_INSTRUCTIONS_CONTROLS = 'Use the \u2190 and \u2192 keys to turn. The \u2191 to thrust.',
  HUD_FONTSIZE_TITLE = 30,
  HUD_FONTSIZE_INSTRUCTIONS = 20;

var drawText = function(ctx, text, fontSize, x, y, alignLeft) {
  var textWidth;
  ctx.strokeStyle = ctx.fillStyle = '#FF11FF';

  do {
    ctx.font = fontSize + 'px sans-serif';
    textWidth = ctx.measureText(text).width;
    fontSize--;
  } while (textWidth > window.innerWidth * 0.9);

  if (!alignLeft)
    x = x - textWidth / 2;

  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  return fontSize + 1;
};

class Hud {
  constructor(player) {
    this.player = player;
  }
  update() {

  }
  draw(dt, ctx) {
    drawText(ctx, 'Level: 1', 18, 5, 20, true);
    var center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    };

    if (this.player.state === 'spawn') {
      drawText(ctx, HUD_TITLE, HUD_FONTSIZE_TITLE, center.x, center.y * 0.4, false);
      var newInstructionFontSize = drawText(ctx, HUD_INSTRUCTIONS, HUD_FONTSIZE_INSTRUCTIONS, center.x, center.y * 0.4 + 40, false);
      drawText(ctx, HUD_INSTRUCTIONS_CONTROLS, newInstructionFontSize, center.x, center.y * 0.4 + 80, false);
    }
  }
  get health() {
    return this.health;
  }
}
export default Hud;
