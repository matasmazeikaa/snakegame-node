const blessed = require('blessed')

class UserInterface {
  constructor() {
    
    this.blessed = blessed;
    this.screen = blessed.screen()
    
    this.gameBox = this.createGameScreenBox()
    this.scoreBox = this.createGameScreenScoreBox()
    this.gameOverBox = this.createGameScreenGameOverBox()

    this.gameContainer = this.blessed.box(this.gameBox)
    this.scoreContainer = this.blessed.box(this.scoreBox)
  }

  createGameScreenBox() {
    return {
      parent: this.screen,
      top: 1,
      left: 0,
      width: '100%',
      height: '100%-1',
      style: {
        fg: 'black',
        bg: 'black'
      }
    };
  }

  createGameScreenScoreBox() {
    return {
      parent: this.screen,
      top: 0,
      left: 'left',
      width: '100%',
      height: 1,
      tags: true,
      style: {
        fg: 'white',
        bg: 'blue',
      },
    }
  }

  createGameScreenGameOverBox() {
    return {
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 20,
      height: 10,
      content: `{center}GAME OVER :(\n Press enter to try again`,
      border: {
        type: 'line'
      },
      style: {
        fg: 'black',
        bg: 'magenta'
      }
    };
  }

  createGameScreenTestSuccessfullBox(time) {
    return {
      parent: this.screen,
      top: 'center',
      left: 'center',
      width: 20,
      height: 10,
      tags: true,
      content: `Test Successful ${time}`,
      border: {
        type: 'line'
      },
      style: {
        fg: 'black',
        bg: 'magenta'
      }
    };
  }

  bindKeyHandlersToScreen(movementHandler, quitButtonsHandler, enterButtonHandler) {
    this.screen.on('keypress', movementHandler);
    this.screen.key(['escape', 'q', 'C-c'], quitButtonsHandler);
    this.screen.key('enter', enterButtonHandler);
  }

  draw(coord, color) {
    this.blessed.box({
      parent: this.gameContainer,
      top: coord.y,
      left: coord.x,
      width: 1,
      height: 1,
      style: {
        fg: color,
        bg: color,
      }
    })
  }

  updateScore(score) {
    this.scoreContainer.setLine(0, `{bold}Score: ${score}`)
  }

  showGameOverScreen() {
    this.gameContainer = this.blessed.box(this.gameOverBox)
    this.renderScreen();
  }

  clearScreen() {
    this.gameContainer.detach();
    this.gameContainer = this.blessed.box(this.gameBox);
  }

  renderScreen() {
    this.screen.render();
  }
}

module.exports.UserInterface = UserInterface
