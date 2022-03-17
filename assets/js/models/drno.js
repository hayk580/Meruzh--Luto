class Drno {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.vy = 0.7
    this.vx = 1.3
    this.sprite = new Image()
    this.sprite.src = './assets/img/drno.png'
    this.sprite.isReady = false
    this.stop = false
    this.sprite.horizontalFrames = 4
    this.sprite.verticalFrames = 4
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 2
    this.sprite.drawCount = 0
    this.die = false
    this.finish_flag = false
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }

    this.movements = {
      right: true
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  draw() {

    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      this.sprite.drawCount++
      if (!this.die) {
        this.animate()
      }
    }
  }

  animate() {
    if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0
      } else {
        this.sprite.horizontalFrameIndex++
      }
      this.sprite.drawCount = 0
    }
  }

  move() {
    if (stop === false) {
      this.x = 0
    }
    else {
      this.x -= SPEED
    }
  }

  moveRigth() {
    if (this.movements.right) {
      this.x -= ALVARDSPEED
    }
    if (stop === false) {
      this.x = 0
    }
  }

  fight_move(el, canvas_height) {
    if (this.turn) {
      this.sprite.horizontalFrameIndex = 1
      if (this.x < 700) {
        this.sprite.verticalFrameIndex = 0
      }
      else if (this.x > 700) {
        this.sprite.verticalFrameIndex = 1
      }
      this.vy = 0
      this.y = canvas_height - 10
      this.x += SPEED * 2.7
    }
    else if (!this.turn) {
      this.sprite.verticalFrameIndex = 2
      this.x -= ALVARDSPEED
    }

    if (this.vy >= 30) {
      this.vy = 2.7
    }
    this.y -= this.vy
    this.vy -= 0.9

    if (this.y >= canvas_height) {
      this.vy *= -1;
    }
    if (this.x >= el.x + 400) {
      this.turn = false;
    }
    else if (this.x <= 30) {
      this.turn = true;
    }
  }

  finish_move() {
    this.turn = false
    this.y -= 5
    this.sprite.horizontalFrameIndex = 3
    this.sprite.verticalFrameIndex = 3
  }

  onKeyEvent(event) {
    const status = event.type === 'keydown'

    switch (event.keyCode) {
      case KEY_RIGHT:
        this.movements.right = status
        break;

      default:
        break;
    }
  }
}

