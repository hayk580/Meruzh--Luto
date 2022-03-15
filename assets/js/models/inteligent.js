class Inteligent {
    constructor(ctx, x, y) {
      this.ctx = ctx
  
      this.x = x
      this.y = y

  
      this.sprite = new Image()
      this.sprite.src = './assets/img/inteligent.png'
      // this.sprite.src = './assets/img/enemy_seed2.png'
      this.afraid = false
      this.sprite.isReady = false
      this.stop = false
      this.sprite.horizontalFrames = 4
      this.sprite.verticalFrames = 2
      this.sprite.horizontalFrameIndex = 3
      this.sprite.verticalFrameIndex = 1
      this.sprite.drawCount = 0
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
      }

    }
  
    animate_left() {
        if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
          
            if (this.sprite.horizontalFrameIndex <= 0 
                &&  this.sprite.verticalFrameIndex == 1)
              {
                this.sprite.horizontalFrameIndex = 3
              
              }
              this.sprite.horizontalFrameIndex--
            this.sprite.drawCount = 0
        }
    }
    animate_right() {
      this.sprite.verticalFrameIndex = 0
      if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
        
          if (this.sprite.horizontalFrameIndex >= 3)
            {
              this.sprite.horizontalFrameIndex = 0
            }
            this.sprite.horizontalFrameIndex++
          this.sprite.drawCount = 0
      }
  }
  
    moveR() {
      if (stop === false) {
        this.x = 0
      }
      else{
        this.x -= ALVARDSPEED
      }
    }
    moveL() {
      if (stop === false) {
        this.x = 0
      }
      else{
        this.x += ALVARDSPEED + 4
      }
    }
    
  
    moveRigth() {
      if (this.movements.right) {
        this.x -= -2 * SPEED
      }
      if (stop === false) {
        this.x = 0
      }
    }
    moveLeft() {
      if (this.movements.right) {
        this.x += SPEED
      }
      if (stop === false) {
        this.x = 0
      }
    }
   
  
  is_afraid(element) {
   return (this.x - element.x <= 400);
  }
  
  
    collidesWithBichok(element) {
      return this.x < element.x + element.width &&
        this.x + this.width > element.x &&
        this.y > element.y + element.height &&
        this.y + this.height > element.y
  
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