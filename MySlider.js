class MySlider {
    constructor() {
        this.slides = document.querySelectorAll(".slide");
        this.btn_right = document.querySelector(".fa-chevron-right");
        this.btn_left = document.querySelector(".fa-chevron-left");
        this.btn_pause = document.querySelector(".fa-pause-circle");
        this.btn_play = document.querySelector(".fa-play-circle");
        this.play_pause = document.querySelector(".play-pause");
        this.btn_play.style.visibility = 'hidden';
        this.i = 0;
        this.controlSlider();
    }
    //next slide
    nextSlide() {
        this.slides[this.i].classList.remove("slide_active");
        if (this.i == (this.slides.length - 1)) {
            this.i = -1;

        }
        this.slides[this.i + 1].classList.add("slide_active");
        this.i++
    }
    //back-slide
    previousSlide() {
        this.slides[this.i].classList.remove("slide_active");
        if (this.i === 0) {
            this.i = this.slides.length;
        }
        this.slides[this.i - 1].classList.add("slide_active");
        this.i--

    }
    playPauseSlide() {
        if (this.play_pause.classList.contains("pausing")) {
            this.idInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
            this.play_pause.classList.remove("pausing");
            this.btn_play.style.visibility = 'hidden';
            this.btn_pause.style.visibility = 'visible';

        }
        else {
            clearInterval(this.idInterval);
            this.btn_play.style.visibility = 'visible';
            this.btn_pause.style.visibility = 'hidden';
            this.play_pause.classList.add("pausing")
        }
    }

    controlSlider() {
        //next slide button
        this.btn_right.addEventListener('click', () => {
            this.nextSlide();
        })
        //back slide button

        this.btn_left.addEventListener('click', () => {
            this.previousSlide();
        })
        //Auto play

        this.idInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.play_pause.addEventListener('click', () => {
            this.playPauseSlide();

        });
        //keybord
        window.addEventListener("keydown", (key) => {
            if (key.keyCode == "37") {
                this.nextSlide();
            } else if (key.keyCode == "39") {
                this.previousSlide();
            } else if (key.keyCode == "32") {
                this.playPauseSlide();
                key.preventDefault();
            }
        }, false);

    }
}
const newSlider = new MySlider();

