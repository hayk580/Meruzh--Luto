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
      this.answer_x = 350
      this.answer_y = 1000
      this.mario_xp_size = 10
      this.mario_move_end = false
      this.mario_xp = "❤❤❤❤❤❤❤❤❤❤"
      this.drno_xp_size = 10
      this.drno_xp =  "❤❤❤❤❤❤❤❤❤❤"
      this.answer_count = 10
      this.drno_die_count = 1
      this.drno_die = false
      this.took = false
      this.is_true_answer = true
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
      this.harcerCount = 0
      this.changeHarc = false
      this.harcer = [
        "Բարի օր ապեր",
        "Քանի տարեկան ե՞ս",
        "Լավ տղա ե՞ս ախպեր",
        "էս թաղից ես ապեր՞",
        "Մեր քուչի լավերից ում գիդես՞",
        "Ճիշտը քանի հատ ա ըլնում՞",
        "Այսինքն մախ ե՞ս թե գաղափար",
        "Դու չլնի ռացիստ ես՞",
        "Ախպերս Շուշանը ասելա չէ, խի էս եկե՞",
        "ի՞նչ կմախթես մեր խաղի խաղացողներին"          
      ]
      this.answers = [
        "ապեր չի անունս Մերուժա",
        "տարիքն ինչ կապ ունի",
        "շրջապատիցս հարցրա",
        "սաղե մեր թաղերնա ապեր",
        "Չխկոենց",
        "կախվածա compiler-ից",
        "մախի դեմ մախ, գաղափարի դեմ գաղափար",
        "Չե ապեր մասիվցի ենք",
        "ախչկա ասածը ասնավանի չի",
        "Արի ստէ ասեմ" 
      ]
      this.wrongAnswers = [
       "ես՞",
       "22",
       "Հա բա ինչ ախպեր",
       "Թաղը որնա՞",
       "Ընկեր Պետրոսյանին",
       "Մի քանի",
       "Ես գաղափարախոս տղա եմ",
       "Իհարկե ոչ",
       "Գիտեմ, ինձ էլ ա ասել չէ",
       "Թող լավ ըլնեն հորս արև"
      ]
      this.background = new Background(this.ctx, this.levels.level11)
  
      this.bag = new Bag(this.ctx,300,700)
      this.shusho = new Shushan(this.ctx, 19500,850)
      this.drno = new Drno ()
      this.shaurma = new Shaurma(this.ctx , 320, 690)
      this.mario = new Mario(this.ctx, 50, this.canvas.height - 120)
      this.alvardTati = new Alvard()
      this.bichok = new Fireball()
      this.policeman = new Police()
      this.inteligent = new Inteligent()
      this.nextLevel = undefined
      this.paperAnimation = undefined
      this.paperPoints = 0
  
      this.coins = [
  
      ]
  
      this.masiviBisetka = new Bisetka(this.ctx, OTHERS_WIDTH - 250, this.canvas.height - 200)
      this.inteligent = [
        new Inteligent(this.ctx, this.mario.x + 1500, this.mario.y),
        new Inteligent(this.ctx, this.mario.x + 5800, this.mario.y),
      ]
  
      this.alvards = [
  
        new Alvard(this.ctx, this.mario.x + 500, this.mario.y),
        new Alvard(this.ctx, this.mario.x + 900, this.mario.y),
        new Alvard(this.ctx, this.mario.x + 2000, this.mario.y),
        new Alvard(this.ctx, this.mario.x + 2400, this.mario.y),
        new Alvard(this.ctx, this.mario.x + 4000, this.mario.y),
        new Alvard(this.ctx, this.mario.x + 4200, this.mario.y)
  
      ]
      this.drnos = new Drno (this.ctx,  2000, this.mario.y)
     
  
  
  
      this.polices = [
        new Police(this.ctx, this.mario.x + 1100, this.mario.y),
        new Police(this.ctx, this.mario.x + 1200, this.mario.y),
        new Police(this.ctx, this.mario.x + 1300, this.mario.y),
        new Police(this.ctx, this.mario.x + 5000, this.mario.y),
        new Police(this.ctx, this.mario.x + 5400, this.mario.y),
        new Police(this.ctx, this.mario.x + 7000, this.mario.y)
      ]

  
  
      this.kims = [
        new Kim(this.ctx, this.mario.x + 2100, this.mario.y - 20),
        new Kim(this.ctx, this.mario.x + 2400, this.mario.y),
      ]
  
  
      this.papers = [
        new Paper(this.ctx, this.mario.x + 1100, this.mario.y),
        new Paper(this.ctx, this.mario.x + 1400, this.mario.y),
        new Paper(this.ctx, this.mario.x + 3000, this.mario.y),
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
        kim_come: new Audio('./assets/sound/Heartbeat Heart Beat (Loopable).wav'),
        inteligent_sound: new Audio('./assets/sound/Male Anger Scream.mp3'),
        took_sound:new Audio('./assets/sound/spit.mp3'),
        drno_trvr:new Audio('./assets/sound/Monster.mp3'),
        chisht:new Audio('./assets/sound/HumanCrowd.wav'),
        sxal:new Audio('./assets/sound/CrowdReaction.wav'),
        house:new Audio('./assets/sound/Halloween.wav'),
        add_bichok:new Audio('./assets/sound/Vibrant_Slot_Change_Lock_1.wav'),
        mario_urax:new Audio('./assets/sound/bigmario.wav'),
        mario_txur:new Audio('./assets/sound/smallmario.wav')
      }
    }
    
    drowGreade(x, tmp) {
      if (tmp == 1) {
        this.drawWall(x, 30, 1)   
        this.drawWall(x + 50, 50, 1)
        this.drawWall(x + 100, 70, 1)
        this.drawWall(x + 150, 90, 1)
        this.drawWall(x + 200, 110, 1)
        this.drawWall(x + (50 * 8), 30, 1)
        this.drawWall(x + 50 + (50 * 6), 50, 1)
        this.drawWall(x + 100 + (50 * 4), 70, 1)
        this.drawWall(x + 150 + (50 * 2), 90, 1)
        //this.drawWall(x + 80, 400, 15)
      }
      if (tmp == 2) {
        this.drawWall(x, 30, 10)
      }
    }
    drawWall(x, y, count) {
      for (let i = 1; i <= count; --count) {
        this.blocks.push(new Blocks(this.ctx, x + (55 * count), this.mario.y - y))
      }
    }
  
  
    drowCOIN(x) {
      this.drawCoin(x, 753, 1)
      this.drawCoin(x, 650, 2)
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
      if (!this.drawInterval) {
        if(this.background.x >= -16000)
        this.sounds.theme.play()
        this.drawInterval = setInterval(() => {
          this.clear()
          this.move()
          this.draw()
          this.checkCollisions()
          this.inteligent.forEach(inteligent => {
            
              if((inteligent.x-this.mario.x)<3000)
              {
            if (inteligent.afraid) {
              inteligent.moveL()
              if(this.intel_sound_count === false){
                this.intel_sound_count = true
                this.sounds.inteligent_sound.play()
  
              }
            }
            else {
              inteligent.moveR()
            }
        }})
          
          if(this.drnos.x - this.mario.x <= 500 && this.answer_count != 0)
          {
            this.mario.drnos_question = true;
          }
          else{
            this.mario.drnos_question = false;
          }
          if(!this.mario.drnos_question && !this.drno_die  && this.drnos.finish_flag == false && this.background.x <= -16950)
          {
            this.drnos.move()
          }
          
          // if(this.drnos.finish_flag && this.drno_xp_size != 0) {
          //   this.drnos.finish_move()
          // }
          if(this.drno_die == false && this.answer_count == 0 && !this.mario.isDie)
          {
            this.drnos.fight_move(this.mario)
            this.sounds.drno_trvr.play()
            //this.sounds.drno_trvr.currentTime = 0
          }
         
          this.alvards.forEach(alvard => {
            if((alvard.x-this.mario.x) < 3000)
            {
            alvard.move()
            }})
          this.polices.forEach(police => {
            if((police.x-this.mario.x)<3000)
            { police.move()}})
          this.papers.forEach(paper => paper.move())
          this.masiviBisetka.move()
        }, this.fps);
      }
  
  
    }
  
    clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  
    draw() {
      this.background.draw()
      this.shusho.draw( )
     
     this.drnos.draw()

      this.kims.forEach(kims => kims.draw())
      
      if (this.bag.flag) {
        this.bag.draw()
      }
      if (this.shaurma.flag) {
        this.shaurma.draw()
        this.shaurma.move()
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
      this.mario.draw()
      if(this.answer_count == 0) {
        this.mario.drnos_question = false
      }

      if(this.mario.drnos_question && this.answer_count != 0) {
        this.dialog = new Image()
        this.finish_him = new Audio('./assets/sound/finish-him.mp3')
        if (this.mario_xp != 0 && this.drno_xp != 0 && this.drnos.x - this.mario.x <= 600) {
          this.ctx.font = '25px Arial'
          this.ctx.fillText(` ${this.mario_xp} `, 300, 75)
          this.ctx.fillText(` ${this.drno_xp}`, 900, 75)
          this.mario.drnos_question = false
        }
        this.dialog.src = './assets/img/questions.png'
        if(!this.is_true_answer) {
            if(this.changeHarc && this.answer_y != 1000) {
                this.harcerCount++
            }
          if(this.answer_y == 240) {
            this.sounds.sxal.play()
            this.mario_xp_size--
            this.mario_xp = this.mario_xp.substring(0 , this.mario_xp_size);
            this.answer_count--
          }
          else if (this.answer_y == 305) {
            this.sounds.chisht.play()
            this.drno_xp_size--
            this.drno_xp = this.drno_xp.substring(0 , this.drno_xp_size)
            this.answer_count--
          }
          this.answer_y = 1000
        }
        
        if(this.harcerCount == 10) {
            this.harcerCount = 0
        }
        this.ctx.drawImage(this.dialog, 250, 50, 725, 302 )
        this.mario.movements.right = false
        this.ctx.font = '20px Arial'
        this.ctx.textAlign = "start"
        this.ctx.fillStyle = "white"
        this.ctx.fillText(`${this.harcer[this.harcerCount]} `, 400  , 140)
        this.ctx.fillText(`${this.wrongAnswers[this.harcerCount]} `, 400, 230)
        this.ctx.font = '37px Arial'
        this.ctx.fillText(`✯`, this.answer_x, this.answer_y)
        this.ctx.font = '20px Arial'
        this.ctx.fillText(`${this.answers[this.harcerCount]} `, 400, 300)
      }
      if ((this.mario_xp != 0 || this.drno_xp != 0) && this.drnos.x - this.mario.x <= 800) {
        this.ctx.font = '25px Arial'
        this.ctx.fillText(` ${this.mario_xp} `, 300, 75)
        this.ctx.fillText(` ${this.drno_xp}`, 900, 75)
        this.mario.drnos_question = false
      }
      this.changeHarc = false
      this.drno_die = false
      if(this.mario_xp_size == 0) {
        this.sounds.theme.pause()
        this.sounds.theme2.play()
        this.drnos.finish_flag = true
        this.mario.flag = 0
        this.mario.isDie = true
        this.mario.animateDie()
      }
      else if(this.drno_xp_size == 0) {  
        this.drnos.vy = 1
        this.drnos.y -= this.drnos.vy;
        this.drno_die=true
        if(this.drno_die_count == 1) {
          this.finish_him.play()
          this.drno_die_count-- 
      }
      else if(this.mario_xp_size != 0 && this.drno_xp_size == 0 ) {
        //this.drnos.fight_move()
      }
     
      if(this.took && this.drno_xp_size == 0)
       this.sounds.took_sound.play()
       this.took=false
      }
      // if(this.drno_die && this.drno_die_count == 1) {
      //   this.finish_him.play()
      //   this.drno_die_count--
      // }

      this.is_true_answer = true
      this.polices.forEach(polices => polices.draw())
      this.pointsCoin.draw()
      // this.alvards.forEach(alvards => alvards.move()) 
      //this.masiviBisetka.draw()
      this.papers.forEach(paper => paper.draw())
      this.ctx.save()
      this.ctx.font = '18px Arial'
      this.ctx.fillText(`միավորներ: ${this.points}`, 30, 25)
      this.ctx.fillText(`բիչոկներ: ${this.mario.bichokcount}`, 30, 50)
      this.ctx.fillText(`ճշտի բալանս: ${this.mario.tuxtcount}`, 30, 75)
      this.ctx.restore()
    }
  
    move() {

      if(this.background.x <= -16400 && this.answer_count >= 9) {
        this.sounds.house.play()
      }
      if(!this.mario.drnos_question && !this.mario.meeting) {
        this.mario.move()
      }
      if(this.drno_xp_size == 0) {
        this.mario.maxX = 1700
      }
     
      if(this.mario.drnos_question) {
        this.mario.resetAnimation()
      }
      if (this.mario.x === this.mario.maxX && this.mario.isDie == false) {
        if(this.background.x >= -17800){
          this.background.move()
        }
        if(this.background.x <= -17800) {
          this.mario.maxX = 1700
        }
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
            if(inteligent.x - this.mario.x <= 700) {
               this.intel_sound_count = false
            }
          })
        }
        this.polices.forEach(polices => polices.moveRigth())
        this.blocks.forEach(blocks => blocks.move())
        this.papers.forEach(papers => papers.move(this.mario.x))
        this.masiviBisetka.move(this.mario.x)
        this.kims.forEach(kim => kim.move())
        this.bag.move()
        this.shusho.move()
      }
      
      
      if ((this.mario.x - this.drno.x >= 1100) && (this.mario_xp_size == 10 && this.drno_xp_size == 10)){
        this.mario.movements.down = true
      }
      
      if(this.mario.drnos_question && this.answer_count != 0) {
        this.drnos.sprite.horizontalFrameIndex = 0
        this.drnos.sprite.verticalFrameIndex = 2
      }
    }
  
    onKeyEvent(event) {
      if(this.mario.drnos_question) {
        const status = event.type === 'keydown'
      switch (event.keyCode) {
        case KEY_UP:
          this.answer_y = 240
          break;
        case KEY_DOWN:
          this.answer_y = 305
          break;
        case KEY_ENTER:
          this.is_true_answer = false
            this.changeHarc = true
          break;
       
        default:
          break;
       }
      }
      else if(!this.mario.drnos_question) {
        const status = event.type === 'keydown'
      switch (event.keyCode) {
        case KEY_T:
         this.took = true       
        default:
          break;
       }
      }
      this.mario.onKeyEvent(event)
      this.background.onKeyEvent(event)
      this.bag.onKeyEvent(event)
      this.shusho.onKeyEvent(event)
      this.coins.forEach(coin => coin.onKeyEvent(event))
      this.alvards.forEach(alvards => alvards.onKeyEvent(event))
      this.polices.forEach(polices => polices.onKeyEvent(event))
      this.kims.forEach(kims => kims.onKeyEvent(event))
      this.blocks.forEach(blocks => blocks.onKeyEvent(event))
      this.papers.forEach(papers => papers.onKeyEvent(event))
      this.masiviBisetka.onKeyEvent(event)
      this.drnos.onKeyEvent(event)
    }
  
    checkCollisions() {
      if (this.points>=50)
      {
        this.points=0
        this.mario.bichokcount+=5
        this.sounds.add_bichok.play()
      }
  
      if (this.drow) {
        this.drow = false
        this.drowGreade(100, 1)
        this.drowGreade(1000, 1)
        this.drowGreade(2000, 2)
        for (let i = 500; i < 10000; i += 800) {
          this.drowCOIN(i);
        }
      }
      if(this.mario_xp_size != 10 && this.drno_xp_size != 10) {
        if(this.mario.collidesWithAlvard(this.drnos)) {
          this.drnos.turn = true
          this.drnos.x += 20
          this.mario_xp_size--
          this.mario_xp = this.mario_xp.substring(0 , this.mario_xp_size);
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
        if (this.mario.bullets[i].collidesWithAnmie(this.drnos) && this.mario_xp_size != 10 && this.drno_xp_size != 10)
        {
          this.mario.bullets.splice(i, 1)
          this.drno_xp_size--
          this.drno_xp = this.drno_xp.substring(0 , this.drno_xp_size)
        }
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
    
if (this.mario.collidesWithAlvard(this.shusho))
{
  this.shusho.y=-30000  
  this.mario.meeting=true
  this.drno_xp_size = 0
}


    if (this.mario.collidesWithShaurma(this.shaurma)) {
      this.shaurma.flag = false;
      this.bag.flag = false;
      this.bag.y = -32687
      if (this.mario.flag == 1 && !this.shaurma.flag && this.shaurmacount == 1 && !this.mario.isDie) {
        this.mario.flag = 2;
        this.shaurmacount = 0;
        this.sounds.mario_urax.play()
      }
      else if (this.mario.flag == 0 && !this.shaurma.flag && this.shaurmacount == 1 && !this.mario.isDie) {
        this.mario.flag = 1;
        this.shaurmacount = 0;
        this.sounds.mario_urax.play()
      }
      
    }
   

    const restCoins = this.coins.filter(coin => !this.mario.collidesWith(coin))

    const restPapers = this.papers.filter(paper => !this.mario.collidesWith(paper))
    this.papers.forEach(paper => {
        if (this.mario.collidesWith(paper)) {
          this.mario.tuxtcount++
            this.drawInterval = false
          this.paperAnimation = setInterval(() => {
            paper.animate(this.mario.x, this.mario.y)
          });
          setTimeout(() => {
            clearInterval(this.paperAnimation)
          }, 2000);
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
        this.sounds.mario_txur.play()
      }
      else if (this.mario.flag == 1) {
        this.alvards = restAlvards
        this.mario.flag = 0
        this.sounds.mario_txur.play()
      }
      else if (this.mario.flag == 0) {
        this.alvards = restAlvards
        this.sounds.theme.pause()
        this.sounds.theme2.play()
        this.mario.isDie = true
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
        this.sounds.mario_txur.play()
      }
      else if (this.mario.flag == 1) {
        this.polices = restPolice
        this.mario.flag = 0
        this.sounds.mario_txur.play()
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