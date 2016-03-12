const HUD_TITLE = 'You\'re a pirate. There are 2 ports doing trade. Time to get your prize.\n',
  HUD_GOAL_INSTRUCTION = 'Steal 2000 gold from the trade ships.',
  HUD_FONTSIZE_TITLE = 30,
  HUD_FONTSIZE_INSTRUCTIONS = 20,
  INSTRUCTIONS_NEGATIVE_Y_GOAL = HUD_FONTSIZE_INSTRUCTIONS * 2.3,
  INSTRUCTIONS_SPEED_MULTIPLIER = 0.02,
  GOALS_FINISHED_FADEOUT_TIME = 5000;

let goalsIterator = 0;
var GOAL_MOVE_MAP = goalsIterator++,
  GOAL_SELECT_BASE = goalsIterator++,
  GOAL_FINISHED = goalsIterator++;

var INSTRUCTIONS_MOVE_MAP = 'Use the arrow keys to move the map.',
  INSTRUCTIONS_SELECT_BASE = 'Good. Now select your base by clicking on it.',
  INSTRUCTIONS_FINISHED = 'Excellent. Now go take over the world.';


class Hud {
  constructor(game, player) {
    this.game = game;
    this.player = player;
    this.goals = 0;
    this.instructionsY = null;
    this.goalsFinishedTimer = 0;
  }
  update(dt, ctx) {
    // console.log(dt);
    var camera = this.game.camera;
    switch (this.goals) {
      case GOAL_MOVE_MAP:
        if (camera && (camera.up || camera.down || camera.left || camera.right)) {
          this.goals++;
        }
        break;
      case GOAL_SELECT_BASE:
        if (ctx.canvas.height - this.instructionsY <= INSTRUCTIONS_NEGATIVE_Y_GOAL) {
          //Set to desired position to correct for dt craziness
          this.instructionsY = ctx.canvas.height - INSTRUCTIONS_NEGATIVE_Y_GOAL;
          let hasSelected = this.game.drawables.some((drawable) => {
            return drawable.selected;
          });
          if (hasSelected) {
            this.goals++;
          }
        } else {
          //Take a second to move to the bottom
          this.instructionsY = this.instructionsY + INSTRUCTIONS_NEGATIVE_Y_GOAL * dt * INSTRUCTIONS_SPEED_MULTIPLIER;
        }
        break;
      case GOAL_FINISHED:
        if (this.goalsFinishedTimer > GOALS_FINISHED_FADEOUT_TIME) {
          this.goals++;
          //Corect for dt
          this.goalsFinishedTimer = GOALS_FINISHED_FADEOUT_TIME;
        } else {
          this.goalsFinishedTimer += dt;
        }
        break;
      default:
    }
  }

  draw(dt, ctx) {
    this.drawText(ctx, `Gold: ${this.player.gold}`, 18, 5, 20, true);
    var center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2
    };
    this.instructionsY = this.instructionsY || center.y * 0.4 + 80;

    switch (this.goals) {
      case GOAL_MOVE_MAP:
        this.drawText(ctx, HUD_TITLE, HUD_FONTSIZE_TITLE, center.x, center.y * 0.4, false);
        var newInstructionFontSize = this.drawText(ctx, HUD_GOAL_INSTRUCTION, HUD_FONTSIZE_INSTRUCTIONS, center.x, center.y * 0.4 + 40, false);
        this.drawText(ctx, INSTRUCTIONS_MOVE_MAP, newInstructionFontSize, center.x, this.instructionsY, false);
        break;
      case GOAL_SELECT_BASE:
        this.drawText(ctx, INSTRUCTIONS_SELECT_BASE, HUD_FONTSIZE_INSTRUCTIONS, center.x, this.instructionsY, false);
        break;
      case GOAL_FINISHED:
        this.drawText(ctx, INSTRUCTIONS_FINISHED, HUD_FONTSIZE_INSTRUCTIONS, center.x, this.instructionsY, false);
        break;
      default:

    }
  }
  drawText(ctx, text, fontSize, x, y, alignLeft) {
    var textWidth;
    var opacity = (GOALS_FINISHED_FADEOUT_TIME - this.goalsFinishedTimer) / GOALS_FINISHED_FADEOUT_TIME;
    ctx.strokeStyle = ctx.fillStyle = `rgba(255,20,255,${opacity})`;

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
  }
}
export default Hud;
