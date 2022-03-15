class Shaurma {
    constructor(ctx, x, y) {
        this.img = new Image();
        this.img.src = "assets/img/shaurma.png";
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 21;
        this.height = 38;
        this.Shaurma_flag = false;
        this.vy = SPEED
        this.vx = SPEED
        this.turn = true
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

    moveright() {
        if (this.movements.right) {
            this.x -= SPEED
        }
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
    move(canvas_height) {
        if (this.turn) {
            this.x += this.vx
        }
        else if (!this.turn) {
            this.x -= this.vx;
        }
        if (this.y <= 10) {
            this.y += this.vy

        }
        this.y -= this.vy
        this.vy -= GRAVITY

        if (this.y >= canvas_height) {
            this.vy *= -1;
        }
        if (this.x >= 1900) {
            this.turn = false;
        }
        else if (this.x <= 10) {
            this.turn = true;
        }

    }

}