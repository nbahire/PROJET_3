class MyMain {
    constructor() {
        this.btnResev = document.querySelector(".btn-reserv");
        this.btnCancel = document.querySelector(".btn-cancel");
        this.reservCount = document.querySelector("#reserv_count");
        this.btnconfirm = document.querySelector(".btn-confirm");
        this.clearButton = document.querySelector(".btn-clear");
        this.insideContainer = document.querySelector(".inside-container");
        this.canvasContainer = document.querySelector(".canvas-container");
        this.canvasContainer.style.visibility = 'hidden';
        this.changeState();
    }

    changeState() {
        this.btnResev.addEventListener('click', () => {
            this.insideContainer.style.visibility = 'hidden';
            this.btnResev.style.visibility = 'hidden';
            this.canvasContainer.style.visibility = 'visible';
            this.btnCancel.style.visibility = 'visible';

        })
        this.btnconfirm.addEventListener('click', () => {
            this.insideContainer.style.visibility = 'visible';
            this.btnResev.style.visibility = 'visible';
            this.canvasContainer.style.visibility = 'hidden';
            this.btnconfirm.style.visibility = 'hidden';
            this.clearButton.style.visibility = 'hidden';
            this.btnCancel.style.visibility = 'hidden';
        })
        this.btnCancel.addEventListener('click', () => {
            this.insideContainer.style.visibility = 'visible';
            this.canvasContainer.style.visibility = 'hidden';
            this.btnResev.style.visibility = 'visible';
            this.btnconfirm.style.visibility = 'hidden';
            this.clearButton.style.visibility = 'hidden';
            this.btnCancel.style.visibility = 'hidden';
        })
    }

}
const newMain = new MyMain();