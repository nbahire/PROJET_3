class Timer {
    constructor() {
        this.countStorage = document.querySelector("#reserv_count");
        this.minutes = 0;
        this.seconds = 0;
        this.interval = 0;
        this.endTimer = sessionStorage.getItem(this.countStorage + 'endTimer');
        if (this.endTimer) {
            this.startCounter(this.endTimer);
            this.countStorage.style.visibility = 'visible';
        } else {
            this.countStorage.style.visibility = 'hidden';
        }
        this.Listener();

    }

    startCounter(duration) {
        this.endTimer = duration;
        if (this.minutes >= 0 && this.seconds > 0) {
            this.stopCounter();
        } else {
            this.countDown();
        }
        this.interval = setInterval(() => this.countDown());
    }
   
    countDown() {
        let timeNow = new Date(Math.ceil((this.endTimer - Date.now()) / 1000) * 1000);
        this.minutes = timeNow.getMinutes();
        this.seconds = timeNow.getSeconds();
        let min = this.minutes;
        let sec = this.seconds;
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }

        this.countStorage.innerHTML = 'Vélo réservé à la  ' + sessionStorage.getItem('station') + ' par ' + localStorage.getItem('name') + ' ' + localStorage.getItem('firstname') + '.\n' + 'Temps restant  ' + min + 'min' + sec + 's.';
        sessionStorage.setItem(this.countStorage + 'endTimer', this.endTimer);
        if (this.minutes === 0 && this.seconds === 0) {
            this.endCounter();
        }

    }
    stopCounter() {
        clearInterval(this.interval);
        sessionStorage.removeItem(this.countStorage + 'endTimer');
    }
    endCounter() {
        clearInterval(this.interval);
        sessionStorage.clear();
        this.countStorage.innerHTML = 'Le temps est écoulé. Votre réservation est annulée.';
    }

    Listener() {
        $('.btn-confirm').on('click', () => {
            if (document.getElementById('name').value && document.getElementById('first_name').value) {
                this.countStorage.style.visibility = 'visible';
                localStorage.setItem('name', document.getElementById('name').value);
                localStorage.setItem('firstname', document.getElementById('first_name').value);
                sessionStorage.setItem('station', document.getElementById('station_name').innerHTML);
                newTimer.startCounter(Date.now() + 20 * 60 * 1000);

            } else {
                alert('Veuillez indiquer votre nom et votre prénom');
            }
        });
        document.getElementById('name').value = localStorage.getItem('name');
        document.getElementById('first_name').value = localStorage.getItem('firstname');
    }
}


let newTimer = new Timer()
