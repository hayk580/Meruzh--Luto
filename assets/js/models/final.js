class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.ctx = this.canvas.getContext('2d')
    this.drow = true
    this.fps = 1040 / 60
    this.answer_x = 350
    this.answer_y = 1000
    this.mario_xp_size = 10
    this.mario_move_end = false
    this.mario_xp = "❤❤❤❤❤❤❤❤❤❤"
    this.drno_xp_size = 10
    this.drno_xp = "❤❤❤❤❤❤❤❤❤❤"
    this.answer_count = 10
    this.drno_die_count = 1
    this.drno_die = false
    this.took = false
    this.firecount=1
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
      level13: './assets/img/Baghramyan-01.png',
      level14: './assets/img/final.png',
      level15: './assets/img/meruzh-shusho.png',
      level16: './assets/img/sister.png'
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
    let index_answer
    let index_name = localStorage.getItem("person")
    if (index_name == "meruzh") {
      index_answer = "ապեր չի անունս Մերուժա"
    } else {
      index_answer = "ապեր չի անունս Լյութոա"
    }
    this.answers = [
      index_answer,
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
      "իմ հետ ե՞ս",
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
    this.background = new Background(this.ctx, this.levels.level14)
    this.mario = new Mario(this.ctx, 50, this.canvas.height - 120)
    this.mario.canFire=false    
    this.nextLevel = undefined
    this.drno = new Drno()
    this.shusho = new Shushan(this.ctx, this.canvas.width - 200, this.canvas.height - 100)
    this.paperPoints = 0


    this.drnos = new Drno(this.ctx, this.canvas.width - 300, this.mario.y)


    let x = 0
    let y = 50

    this.points = 0

    this.points = 0
    this.pointsCoin = new Coin(this.ctx, 10, 10)
    const themMusic = './assets/sound/mw-theme.mp3'
    const theme = new Audio(themMusic)
    const theme2 = new Audio('./assets/sound/die.mp3')
    // const love = new Audio('./assets/sound/love.mp3')

    theme.volume = 0.1


    this.sounds = {
      theme,
      theme2,
      die: new Audio('./assets/sound/die.mp3'),
      took_sound: new Audio('./assets/sound/spit.mp3'),
      chisht: new Audio('./assets/sound/HumanCrowd.wav'),
      sxal: new Audio('./assets/sound/CrowdReaction.wav'),
      house: new Audio('./assets/sound/Halloween.wav'),

    }
  }


  start() {
    localStorage.setItem("level", "final.html")

    this.mario.sounds.themMusic.pause()

    if (!this.drawInterval) {
      if (this.background.x >= -16000)
        this.sounds.theme.play()
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.draw()
        this.checkCollisions()


        if (this.drnos.x - this.mario.x <= 500 && this.answer_count != 0) {
          this.mario.drnos_question = true;
        }
        else {
          this.mario.drnos_question = false;
        }
        if (!this.mario.drnos_question && !this.drno_die && this.drnos.finish_flag == false) {
          this.drnos.move()
        }

        if (this.drno_die == false && this.answer_count == 0 && !this.mario.isDie) {
          this.drnos.fight_move(this.mario, this.canvas.height - 100)
         
        }
       
        if (this.drno_die) {
          this.drnos.finish_move()
        }
       
      }, this.fps);
    }
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.background.draw()
    this.shusho.draw()
    this.drnos.draw()
    this.mario.draw()
    if (this.answer_count == 0) {
      this.mario.drnos_question = false
    }


    if (this.drno_xp_size <= 0) {
      this.mario.maxX = this.canvas.width - 200
    }


    if (this.mario.drnos_question && this.answer_count != 0) {
      this.dialog = new Image()
      this.finish_him = new Audio('./assets/sound/finish-him.mp3')
      if (this.mario_xp != 0 && this.drno_xp != 0 && this.drnos.x - this.mario.x <= 600) {
        this.ctx.font = '25px Arial'
        if (!this.mario.meeting) {
          this.ctx.fillText(` ${this.mario_xp} `, 300, 75)
          this.ctx.fillText(` ${this.drno_xp}`, 900, 75)
        }


        this.mario.drnos_question = false
      }
      this.dialog.src = './assets/img/questions.png'
      if (!this.is_true_answer) {
        if (this.changeHarc && this.answer_y != 1000) {
          this.harcerCount++
        }
        if (this.answer_y == 240) {
          this.sounds.sxal.play()
          this.mario_xp_size--
          this.mario_xp = this.mario_xp.substring(0, this.mario_xp_size);
          this.answer_count--
        }
        else if (this.answer_y == 305) {
          this.sounds.chisht.play()
          this.drno_xp_size--
          this.drno_xp = this.drno_xp.substring(0, this.drno_xp_size)
          this.answer_count--
        }
        this.answer_y = 1000
      }

      if (this.harcerCount == 10) {
        this.harcerCount = 0
      }

      this.ctx.drawImage(this.dialog, 250, 50, 725, 302)
      this.mario.movements.right = false
      this.ctx.font = '20px Arial'
      this.ctx.textAlign = "start"
      this.ctx.fillStyle = "white"
      this.ctx.fillText(`${this.harcer[this.harcerCount]} `, 400, 140)
      this.ctx.fillText(`${this.wrongAnswers[this.harcerCount]} `, 400, 230)
      this.ctx.font = '37px Arial'
      this.ctx.fillText(`✯`, this.answer_x, this.answer_y)
      this.ctx.font = '20px Arial'
      this.ctx.fillText(`${this.answers[this.harcerCount]} `, 400, 300)
    }
    if (!this.mario.meeting && (this.mario_xp != 0 || this.drno_xp != 0) && this.drnos.x - this.mario.x <= 800) {
      this.ctx.font = '25px Arial'
      this.ctx.fillText(` ${this.mario_xp} `, 300, 75)
      this.ctx.fillText(` ${this.drno_xp}`, 900, 75)

      this.mario.drnos_question = false
    }
    this.changeHarc = false
    this.drno_die = false
    console.log("drno xp size" + this.drno_xp_size)

    if (this.mario_xp_size == 0) {
      this.sounds.theme.pause()
      this.sounds.theme2.play()
      this.drnos.finish_flag = true
      this.mario.flag = 0
      this.mario.isDie = true
      this.mario.animateDie()
    }

    else if (this.drno_xp_size <= 0) {
      this.drno_die = true
      this.drnos.die = true
      if (this.drno_die_count == 1) {
        this.finish_him.play()
        this.drno_die_count--
      }

      if (this.took && this.drno_xp_size == 0)
        this.sounds.took_sound.play()
      this.took = false
    }

    this.is_true_answer = true
    if (!this.mario.meeting) {
      this.ctx.fillText(`բիչոկներ: ${this.mario.bichokcount}`, 30, 50)
    }

  }

  move() {


    if (!this.mario.drnos_question && !this.mario.meeting) {
      this.mario.move()
    }

    if (this.mario.drnos_question) {
      this.mario.resetAnimation()
    }

    if ((this.mario.x - this.drno.x >= 1100) && (this.mario_xp_size == 10 && this.drno_xp_size == 10)) {
      this.mario.movements.down = true
    }

    if (this.mario.drnos_question && this.answer_count != 0) {
      this.drnos.sprite.horizontalFrameIndex = 0
      this.drnos.sprite.verticalFrameIndex = 2
    }
  }

  onKeyEvent(event) {
    if (this.mario.drnos_question) {
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
    else if (!this.mario.drnos_question) {
      const status = event.type === 'keydown'
      switch (event.keyCode) {
        case KEY_T:
          this.took = true
        default:
          break;
      }
    }
    this.mario.onKeyEvent(event)
    if (!this.mario.drnos_question && this.drno_xp_size != 0) {
      this.background.onKeyEvent(event)
      this.shusho.onKeyEvent(event)
    }

    if (!this.mario.drnos_question) {
      this.background.onKeyEvent(event)
      this.shusho.onKeyEvent(event)
    }
    this.drnos.onKeyEvent(event)
  }

  checkCollisions() {


     if (this.answer_count==0 && !this.drno_die && this.firecount==1)
        {
         
            this.mario.canFire = true
            this.firecount=0
         
        }

    if (this.mario_xp_size != 10 && this.drno_xp_size != 10) {
      if (this.mario.collidesWithAlvard(this.drnos)) {
        this.drnos.turn = true
        this.drnos.x += 30
        this.mario_xp_size--
        this.mario_xp = this.mario_xp.substring(0, this.mario_xp_size);
      }
    }

    for (let i = 0; i < this.mario.bullets.length; i++) {
      if (this.mario.bullets[i].collidesWithAnmie(this.drnos) && this.mario_xp_size != 10 && this.drno_xp_size != 10) {
        this.mario.bullets.splice(i, 1)
        this.drno_xp_size--
        this.drno_xp = this.drno_xp.substring(0, this.drno_xp_size)
      }
    }
    for (let i = 0; i < this.mario.bulletsleft.length; i++) {
      if (this.mario.bulletsleft[i].collidesWithAnmie(this.drnos) && this.mario_xp_size != 10 && this.drno_xp_size != 10) {
        this.mario.bulletsleft.splice(i, 1)
        this.drno_xp_size--
        this.drno_xp = this.drno_xp.substring(0, this.drno_xp_size)
      }
    }
    if (this.mario.collidesWithAlvard(this.shusho)) {
      this.shusho.y = -30000
      this.mario.meeting = true
      if(localStorage.getItem('person') == "meruzh")
      {
        this.background = new Background(this.ctx, this.levels.level15)
        setTimeout(()=>{
          window.location.href = 'intro.html'; //Will take you to Google.

        }, 6000)
      }
      else {
      this.background = new Background(this.ctx, this.levels.level16)
      setTimeout(()=>{
        window.location.href = 'intro.html'; //Will take you to Google.

      }, 6000)
      }
      this.drno_xp_size = 0
    }











  }

}