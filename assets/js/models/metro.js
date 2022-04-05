class Game {

  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
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
      level13: './assets/img/Baghramyan-01.png'
    }
    this.background = new Background(this.ctx, this.levels.level6)


    this.mario = new Mario(this.ctx, 50, this.canvas.height -  380)
    this.alvardTati = new Alvard()
    this.bichok = new Fireball()
    this.inteligent = new Inteligent()
    this.policeman = new Police()
    this.nextLevel = undefined
    this.paperAnimation = undefined
    this.paperPoints = 0
    this.bag = new Bag(this.ctx, 8300, this.canvas.height - 300)
    this.shaurma = new Shaurma(this.ctx, this.bag.x + 20, this.bag.y - 10)

    this.coins = [

    ]

    this.masiviBisetka = new Bisetka(this.ctx, OTHERS_WIDTH - 250, this.canvas.height - 200)
    this.inteligent = [
      new Inteligent(this.ctx, this.mario.x + 1200, this.mario.y),
      new Inteligent(this.ctx, this.mario.x + 5800, this.mario.y),
    ]

    this.alvards = [
      
    ]



    this.polices = [
      
    ]


    this.kims = [
      new Kim(this.ctx, this.mario.x + 2100, this.mario.y - 20),
      new Kim(this.ctx, this.mario.x + 5000, this.mario.y),
      new Kim(this.ctx, this.mario.x + 10000, this.mario.y),
      new Kim(this.ctx, this.mario.x + 14000, this.mario.y),
    ]


    this.papers = [
      new Paper(this.ctx, this.mario.x + 15000, this.mario.y),
    ]


    this.blocks = [



    ]

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
      kim_come: new Audio('./assets/sound/kimcome.wav'),
      inteligent_sound: new Audio('./assets/sound/Male Anger Scream.mp3'),
      open_tuxt_sound: new Audio('./assets/sound/Tuxt bacel.wav'),
      add_bichok: new Audio('./assets/sound/Vibrant_Slot_Change_Lock_1.wav'),
      mario_urax: new Audio('./assets/sound/bigmario.wav'),
      mario_txur: new Audio('./assets/sound/smallmario.wav'),
      kill: new Audio('./assets/sound/headjump.wav'),


    }
  }

  drowGreade(x, tmp) {                                         
  //   if (tmp == 1) {
  //     this.drawWall(x, 30, 1)
  //     this.drawWall(x + 58, 50, 1)
  //     this.drawWall(x + 116, 70, 1)
  //     this.drawWall(x + 174, 90, 1)
  //     this.drawWall(x + 232, 110, 1)
  //     this.drawWall(x + (58 * 8), 30, 1)
  //     this.drawWall(x + 58 + (58 * 6), 50, 1)
  //     this.drawWall(x + 116 + (58 * 4), 70, 1)
  //     this.drawWall(x + 174 + (58 * 2), 90, 1)

  //   }
  //   if (tmp == 2) {
  //     this.drawWall(x, 30, 10)
  //   }
  }
  drawWall(x, y, count) {
    for (let i = 1; i <= count; --count) {
      this.blocks.push(new Blocks(this.ctx, x + (55 * count), this.mario.y - y))
    }
  }


  drowCOIN(x, tmp) {
    this.drawCoin(x, this.canvas.height -  452  , 1)
    this.drawCoin(x + 1000, this.canvas.height -  452, 2)
   
  }

  drawCoin(x, y, tmp) {
    if (tmp == 1) {
      //this.coins.push(new Coin(this.ctx, x + (1*80) , y-(50) )) 
      this.coins.push(new Coin(this.ctx, x + (2 * 80) + 10, y - (100)))
      this.coins.push(new Coin(this.ctx, x + (3 * 80), y - (150)))
      this.coins.push(new Coin(this.ctx, x + (4 * 80), y - (200)))
      this.coins.push(new Coin(this.ctx, x + (5 * 80), y - (200)))
      this.coins.push(new Coin(this.ctx, x + (6 * 80), y - (150)))
      this.coins.push(new Coin(this.ctx, x + (7 * 80), y - (100)))
      this.coins.push(new Coin(this.ctx, x + (8 * 80), y - (50)))
    }
    if (tmp == 2) {
      for (let i = 0; i < 10; ++i) {
        this.coins.push(new Coin(this.ctx, x + (i * 50), y - 20))
      }
    }
  }


  start() {
    localStorage.setItem("level", "index6.html")

    if (!this.drawInterval) {
      this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()
        this.inteligent.forEach(inteligent => {
          if (inteligent.afraid) {
            inteligent.moveL()
            if (this.intel_sound_count === false) {
              this.intel_sound_count = true
              this.sounds.inteligent_sound.play()

            }
          }
          else {
            inteligent.moveR()
          }
        })
        this.alvards.forEach(alvard => alvard.move())
        this.polices.forEach(police => police.move())
        this.papers.forEach(paper => paper.move())
      }, this.fps);
    }


  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {

    this.background.draw()
    this.kims.forEach(kims => kims.draw())
   
    if (this.bag.flag) {
      this.bag.draw()
    }
    this.ctx.font = '18px Arial'
    //this.ctx.fillText(`ճշտի բալանս: ${sessionStorage.getItem('tuxtcount')}`, 30, 75)
    if (this.shaurma.flag) {
      this.shaurma.draw()
      this.shaurma.move(this.canvas.height - 50)
    }
    this.coins.forEach(coin => coin.draw())
    this.blocks.forEach(blocks => blocks.draw())
    this.alvards.forEach(alvards => alvards.draw())
    this.inteligent.forEach(inteligent => {
      inteligent.draw()
      if (inteligent.afraid) {
        inteligent.animate_right()
      }
      else {
        inteligent.animate_left()
      }
    })
    this.polices.forEach(polices => polices.draw())
    this.pointsCoin.draw()
    this.mario.draw() 
    this.masiviBisetka.draw()
    this.papers.forEach(paper => paper.draw())
    this.ctx.save()
    this.ctx.font = '18px Arial'
    this.ctx.fillText(`միավորներ: ${this.points}`, 30, 25)
    this.ctx.fillText(`բիչոկներ: ${this.mario.bichokcount}`, 30, 50)
    this.ctx.restore()
  }

  move() {
    if (this.mario.x === this.mario.maxX && this.mario.isDie == false && this.mario.let_move) {
      this.background.move()
      this.coins.forEach(coins => coins.move())
      this.alvards.forEach(alvards => alvards.stop = false)
      this.alvardTati.stop = false
      this.alvards.forEach(alvards => alvards.moveRigth())
      if (this.inteligent.afraid) {
        this.inteligent.forEach(inteligent => inteligent.moveLeft())
      }
      else {
        this.inteligent.forEach(inteligent => {
          inteligent.moveRigth()
          if (inteligent.x - this.mario.x <= 700) {
            this.intel_sound_count = false
          }
        })
      }
      this.polices.forEach(polices => polices.moveRigth())
      this.blocks.forEach(blocks => blocks.move())
      this.papers.forEach(papers => papers.move(this.mario.x))
      this.kims.forEach(kim => kim.move())
      this.bag.move()
      this.shaurma.moveRight()
    }
    this.mario.move()

  }

  onKeyEvent(event) {
    this.mario.onKeyEvent(event)
    this.background.onKeyEvent(event)
    this.bag.onKeyEvent(event)
    this.coins.forEach(coin => coin.onKeyEvent(event))
    this.alvards.forEach(alvards => alvards.onKeyEvent(event))
    this.polices.forEach(polices => polices.onKeyEvent(event))
    this.kims.forEach(kims => kims.onKeyEvent(event))
    this.blocks.forEach(blocks => blocks.onKeyEvent(event))
    this.papers.forEach(papers => papers.onKeyEvent(event))
    this.masiviBisetka.onKeyEvent(event)
    this.shaurma.onKeyEvent(event)
  }

  checkCollisions() {

    if (this.points >= 50) {
      this.points = 0
      this.mario.bichokcount += 5
      this.sounds.add_bichok.play()
    }

    if (this.drow) {
      if (this.drow) {
        this.drow = false
        // this.drowGreade(400, 1)
        // this.drowGreade(1000, 1)
        // this.drowGreade(2000, 2)
        // this.drowGreade(2500, 1)
        // this.drowGreade(3150, 2)
        // this.drowGreade(4200, 1)
        // this.drowGreade(5000, 2)
        // this.drowGreade(5500, 2)
        // this.drowGreade(6000, 1)
        // this.drowGreade(6800, 2)
        // this.drowGreade(7200, 1)
        // this.drowGreade(8000, 2)
        // this.drowGreade(8500, 1)
        // this.drowGreade(9200, 2)
        // this.drowGreade(10400, 1)
        // this.drowGreade(11500, 2)
        // this.drowGreade(12900, 1)
        // this.drowGreade(13700, 1)
        // this.drowGreade(14300, 2)
        // this.drowGreade(15000, 1)
        // this.drowGreade(16000, 1)
        // this.drowGreade(17900, 2)
        // this.drowGreade(18500, 2)
        // this.drowGreade(19000, 2)
        for (let i = 500; i < 19500; i += 1781) {
          this.drowCOIN(i, 1);
        }
      }
    }



    for (let i = 0; i < this.mario.bullets.length; i++) {

      const KodrvacAlvards = this.alvards.filter(alvard => !this.mario.bullets[i].collidesWithAnmie(alvard))
      if (this.alvards.length - KodrvacAlvards.length) {
        this.mario.bullets.splice(i, 1)
      }
      this.alvards = KodrvacAlvards
    }
    for (let i = 0; i < this.mario.bullets.length; i++) {

      const KodrvacPolice = this.polices.filter(police => !this.mario.bullets[i].collidesWithAnmie(police))
      if (this.polices.length - KodrvacPolice.length) {
        this.mario.bullets.splice(i, 1)
      }
      this.polices = KodrvacPolice
    }
    for (let i = 0; i < this.mario.bullets.length; i++) {

      const KodrvacIntel = this.inteligent.filter(intel => !this.mario.bullets[i].collidesWithAnmie(intel))
      if (this.inteligent.length - KodrvacIntel.length) {
        this.mario.bullets.splice(i, 1)
      }
      this.inteligent = KodrvacIntel
    }

    for (let i = 0; i < this.mario.bulletsleft.length; i++) {

      const KodrvacAlvards = this.alvards.filter(alvard => !this.mario.bulletsleft[i].collidesWithAnmie(alvard))
      if (this.alvards.length - KodrvacAlvards.length) {
        this.mario.bulletsleft.splice(i, 1)
      }
      this.alvards = KodrvacAlvards
    }
    for (let i = 0; i < this.mario.bulletsleft.length; i++) {
    
      const KodrvacPolice = this.polices.filter(police => !this.mario.bulletsleft[i].collidesWithAnmie(police))
      if (this.polices.length - KodrvacPolice.length) {
        this.mario.bulletsleft.splice(i, 1)
      }
      this.polices = KodrvacPolice
    }
    for (let i = 0; i < this.mario.bulletsleft.length; i++) {
    
      const KodrvacIntel = this.inteligent.filter(intel => !this.mario.bulletsleft[i].collidesWithAnmie(intel))
      if (this.inteligent.length - KodrvacIntel.length) {
        this.mario.bulletsleft.splice(i, 1)
      }
      this.inteligent = KodrvacIntel
    }


    if (this.mario.collidesWithShaurma(this.shaurma)) {
      this.shaurma.flag = false;
      this.bag.flag = false;
      this.bag.y = -32687
      if (this.mario.flag == 1 && !this.shaurma.flag && this.shaurmacount == 1) {
        this.mario.flag = 2;
        this.shaurmacount = 0;
      }
      else if (this.mario.flag == 0 && !this.shaurma.flag && this.shaurmacount == 1) {
        this.mario.flag = 1;
        this.shaurmacount = 0;
      }

    }

    if(this.alvards.length == 0) {
        this.alvards.push(
            new Alvard(this.ctx, this.canvas.width + 340, this.canvas.height - 380),
            new Alvard(this.ctx, this.canvas.width + 720, this.canvas.height - 380),
            new Alvard(this.ctx, this.canvas.width + 1270, this.canvas.height - 380),
            )
    }

    this.alvards.forEach(alvard => {
        
        if(alvard.x < 0) {
            this.alvards.shift()
            this.alvards.push(new Alvard(this.ctx, this.canvas.width + 200, this.canvas.height - 380))
        }
    })

    if(this.polices.length == 0) {
        this.polices.push(
            new Police(this.ctx, this.canvas.width + 500, this.canvas.height - 380),
            new Police(this.ctx, this.canvas.width + 1200, this.canvas.height - 380),
            new Police(this.ctx, this.canvas.width + 1700, this.canvas.height - 380),
            )
    }

    this.polices.forEach(police => {
        
        if(police.x < 0) {
            this.polices.shift()
            this.polices.push(new Police(this.ctx, this.canvas.width + 340, this.canvas.height - 380))
             
        }
    })

    const restCoins = this.coins.filter(coin => !this.mario.collidesWith(coin))

    const restPapers = this.papers.filter(paper => !this.mario.collidesWith(paper))
    this.papers.forEach(paper => {
      if (this.mario.collidesWith(paper)) {

        this.sounds.open_tuxt_sound.play()
        openModal()
      }
    })

    this.inteligent.forEach(inteligent => {
      if (inteligent.is_afraid(this.mario)) {
        inteligent.afraid = true;
      }
    })
    const newPapers = this.papers.length - restPapers.length // paper-ov inch ka sax avelacraca
    const newPoints = this.coins.length - restCoins.length
    this.paperPoints += newPapers
    this.papers = restPapers
    this.points += newPoints


    if (newPoints && this.mario.isDie == false) {
      this.sounds.coin.currentTime = 0
      this.sounds.coin.play()
    }

    this.coins = restCoins


    if (this.mario.collidesWithBag(this.bag)) {
      this.shaurma.flag = true;
    }



    const headAlvards = this.alvards.filter(alvard => !this.mario.HeadJump(alvard))
    const newheadAlvards = this.alvards.length - headAlvards.length
    console.log(newheadAlvards)
    if (newheadAlvards) {
      this.alvards = headAlvards

    }
    const headPolice = this.polices.filter(police => !this.mario.HeadJump(police))
    const newheadPolice = this.polices.length - headPolice.length
    if (newheadPolice) {
      this.polices = headPolice

    }


    const restAlvards = this.alvards.filter(alvard => !this.mario.collidesWithAlvard(alvard))
    const newAlvards = this.alvards.length - restAlvards.length
    this.points += newAlvards

    if (newAlvards) {
      this.sounds.alvard.currentTime = 0
      this.sounds.alvard.play()

      if (this.mario.flag == 2) {
        this.alvards = restAlvards
        this.mario.flag = 1
      }
      else if (this.mario.flag == 1) {
        this.alvards = restAlvards
        this.mario.flag = 0

      }
      else if (this.mario.flag == 0) {
        this.alvards = restAlvards
        this.sounds.theme.pause()
        this.sounds.theme2.play()
        this.mario.isDie = true
        setTimeout(() => {
          window.location.href = "gameover.html"

        }, 2000)

        this.mario.animateDie()
        this.sounds.tati.play()
      }

    }
    const restPolice = this.polices.filter(police => !this.mario.collidesWithAlvard(police))
    const newPolice = this.polices.length - restPolice.length
    this.points += newPolice

    if (newPolice) {
      // this.sounds.alvard.currentTime = 0
      // this.sounds.alvard.play()

      if (this.mario.flag == 2) {
        this.polices = restPolice
        this.mario.flag = 1
      }
      else if (this.mario.flag == 1) {
        this.polices = restPolice
        this.mario.flag = 0

      }
      else if (this.mario.flag == 0) {
        this.polices = restPolice
        this.sounds.theme.pause()
        this.sounds.theme2.play()
        this.mario.isDie = true
        this.mario.animateDie()
      }

    }

    const restKim = this.kims.filter(kim => !this.mario.collidesWithKim(kim))
    const newKim = this.kims.length - restKim.length

    if (newKim) {
      //this.sounds.kim_come.currentTime = 0;
      this.sounds.kim_come.play()
    }

    //this.kims = restKim


    if (this.background.x <= - OTHERS_WIDTH + 1000) {
      this.mario.movements.down = true
      window.location.replace('./index17.html')

      setTimeout(() => {

      }, 2000);

    }

    
    this.blocks.map(el => {


      const x = this.mario.collidesWithBlocks(el)

      if (x && !this.mario.isDie) {


        this.mario.y = el.y - 116;

        if (this.mario.y == el.y - 116) {
          this.mario.isJumping = false
        }
        else {
          this.mario.vy = 0;
        }

      }
      else if (this.mario.x >= el.x - el.width &&
        this.mario.x <= el.x + el.width && this.mario.y > el.y) {
        this.mario.isJumping = true
      }

    })


  }





}