class Shushan {
    constructor(ctx,x,y) {
        this.img = new Image();
        this.img.src = "assets/img/Shushan.png";
        this.ctx = ctx;
        this.x = x;
        this.y = y;   
        this.width = 62;
        this.height = 50;
        this.flag = true;
        this.movements = {
            right: false
        }        

    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.x,
            this.y,
        )
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

    move() {
        if (this.movements.right) {
          this.x -= 3
        }
    }

    

}