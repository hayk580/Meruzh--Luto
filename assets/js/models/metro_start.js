class Game {

    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId)
      this.canvas.width = 1340
      this.canvas.height = 637
      this.ctx = this.canvas.getContext('2d')
      this.drow = true
      this.fps = 1040 / 60
      this.drawInterval = undefined
      this.shaurmacount = 1
      this.levels = {
        level1: './assets/img/masiv.png',
        level2: './assets/img/Komitas-01.png',
        level3: './assets/img/Haghtanaki aygi-01.png',
        level4: './assets/img/kaskad copy-01.png',
        level5: './assets/img/Hraparakai-01.png',
        level6: './assets/img/Metro-01.png',
        level7: './assets/img/Rossia.png',
        level8: './assets/img/Arshakunyac-01.png',
        level9: './assets/img/Hayreniq-01.png',
        level10: './assets/img/3rd Mas-01.png',
        level11: './assets/img/Bangladesh-01.png',
        level12: './assets/img/Barekamutyun-01.png',
        level13: './assets/img/Baghramyan-01.png',
        level_metro: './assets/img/Metro-helnel_mtnel.png'
      }
      this.background = new Image()
      this.background.src = this.levels.level_metro
      this.bag = new Bag(this.ctx)
      this.shaurma = new Shaurma(this.ctx)
      this.mario = new Mario(this.ctx, 0, 381)
      this.mario.y = 200
      this.alvardTati = new Alvard()
      this.bichok = new Fireball()
      this.inteligent = new Inteligent()
      this.policeman = new Police()
      this.nextLevel = undefined
      this.paperAnimation = undefined
      this.paperPoints = 0
      this.eskalator = new Image()
      this.eskalator.src = './assets/img/Metro-03.png'
      let x = 0
      let y = 50
  
      this.points = 0
      this.points = 0
      this.pointsCoin = new Coin(this.ctx, 10, 10)
      const themMusic = './assets/sound/mw-theme.mp3'
      const theme = new Audio(themMusic)
      const theme2 = new Audio('./assets/sound/die.mp3')
  
      theme.volume = 0.1
  
      this.sounds = {
        theme,
        theme2,
        coin: new Audio('./assets/sound/coin.wav'),
        alvard: new Audio('./assets/sound/coin.wav'),
        die: new Audio('./assets/sound/die.mp3'),
        tati: new Audio('./assets/sound/tati.wav'),
        kim_come: new Audio('./assets/sound/kimcome.wav')
      }
    }
  
   
    start() {
      if (!this.drawInterval) {
        this.sounds.theme.play()
        this.drawInterval = setInterval(() => {
          this.clear()
          this.move()
          this.draw()
        }, this.fps);
      }
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  
    draw() {
  
      this.ctx.drawImage(this.background, 0, 0, 1375, 695)
      this.mario.draw()
      this.pointsCoin.draw()
      this.ctx.drawImage(this.eskalator, -200, 100 , 500, 400 )
      this.ctx.save()
      this.ctx.font = '18px Arial'
      this.ctx.fillText(`միավորներ: ${this.points}`, 30, 25)
      this.ctx.fillText(`բիչոկներ: ${this.mario.bichokcount}`, 30, 50)
      this.ctx.restore()
    }
  
    move() {
      this.mario.movements.down = false
      this.mario.movements.up = false
      this.mario.move()
      
      if(this.mario.x == 670) {
        this.mario.y = 355
        this.mario.resetAnimation()
        window.location.replace("./index6.html")
      }
      if(this.mario.movements.right) {
        this.mario.y += 3
      }
      else if(this.mario.movements.left && this.mario.x != 0) {
        this.mario.y -= 3
      }
    }
    
  
    onKeyEvent(event) {
      if(this.mario.x < 280) {
        this.mario.onKeyEvent(event)
      }
      
      
    }
  
}