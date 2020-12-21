class MyCanvas {
    constructor() {
        this.painting = false;
        this.canvas = document.querySelector("#canvas");
        this.clearButton = document.querySelector(".btn-clear");
        this.btnCancel = document.querySelector(".btn-cancel");
        this.btnConfirm = document.querySelector(".btn-confirm");
        this.btnConfirm.style.visibility = 'hidden';
        this.clearButton.style.visibility = 'hidden';
        this.codeName = window.navigator;
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.shadowColor = "#333";
        this.ctx.shadowBlur = 1;
        this.ctx.strokeStyle = "#000";
        this.ctx.lineWidth = 3;
        this.ctx.lineJoin = this.ctx.lineCap = 'round';
        this.mouseTouchEvents();
    }

    onTouchCancel(event) {
        event.preventDefault();
        this.ctx.closePath();
    }

    onTouchEnd(event) {
        event.preventDefault();
        this.painting = false;
        this.ctx.closePath();
    }

    onTouchStart(event) {
        event.preventDefault();
        const point = this.point(event);
        this.ctx.moveTo(point.x, point.y);
        this.ctx.beginPath();
        this.painting = true;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.btnConfirm.style.visibility = 'hidden';
    }

    onMouseOut(event) {
        event.preventDefault();
        this.ctx.closePath();
    }

    onMouseEnter(event) {
        event.preventDefault();
        this.painting = event.buttons > 0 ? true : false;
        if (this.painting) {
            const point = this.point(event);
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
        }
    }

    onMouseUp(event) {
        event.preventDefault();
        this.painting = false;
        this.ctx.closePath();
    }

    onMouseDown(event) {
        event.preventDefault();
        const point = this.point(event);
        this.ctx.moveTo(point.x, point.y);
        this.ctx.beginPath();
        this.painting = true;
    }

    draw(event) {
        event.preventDefault();
        if (this.painting) {
            const point = this.point(event);
            this.ctx.lineTo(point.x, point.y);
            this.ctx.stroke();
            this.btnConfirm.style.visibility = 'visible';
            this.clearButton.style.visibility = 'visible';
        }
    }

    point(event) {
        if (event.constructor == MouseEvent) {
            return {

                x: event.offsetX / this.scale,
                y: event.offsetY / this.scale
            };
        } else {
            let rect = this.canvas.getBoundingClientRect(event);
            return {

                x: (event.touches[0].clientX - rect.left) * (this.canvas.width / rect.width),
                y: (event.touches[0].clientY - rect.top) * (this.canvas.height / rect.height)
            };
            
        }
    }


    //Renvoie la largeur totale du canvas
    get scale() {
        return this.canvas.offsetWidth / this.canvas.width;
    }
    mouseTouchEvents() {
        this.canvas.addEventListener("mousedown", this.onMouseDown.bind(this));
        this.canvas.addEventListener("mouseup", this.onMouseUp.bind(this));
        this.canvas.addEventListener("mousemove", this.draw.bind(this));
        this.canvas.addEventListener("mouseleave", this.onMouseOut.bind(this));
        this.canvas.addEventListener("mouseenter", this.onMouseEnter.bind(this));
        this.canvas.addEventListener("touchstart", this.onTouchStart.bind(this));
        this.canvas.addEventListener("touchend", this.onTouchEnd.bind(this));
        this.canvas.addEventListener("touchmove", this.draw.bind(this));
        this.canvas.addEventListener("touchcancel", this.onTouchCancel.bind(this));
        this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
        this.btnConfirm.addEventListener("click", this.clearCanvas.bind(this));
        this.btnCancel.addEventListener("click", this.clearCanvas.bind(this));

    }


}

const newcanvas = new MyCanvas();
