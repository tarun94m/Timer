/***
 *  Implement the count down timer.
 * 
 *   must have features:
 *      pass values: in mins and seconds input fields
 *      play, stop, reset buttons
 *      validtaion on the input fields are required
 * 
 *  good to have features:
 *     reset the timer
 * 
 *  Approach:
 *    minLSB, minMSB, secLSB and SecMSB
 *    - start - to start timer on clicking on it.
 *    - stop - to stop the timer
 *    - reset - to reset the timer as values to 0.
 */

class Timer {
    constructor(minMSB, minLSB, secMSB, secLSB, start, stop, reset, display){
       this.minMSB = document.querySelector(minMSB);
       this.minLSB = document.getElementById(minLSB);
       this.secMSB = document.getElementById(secMSB);
       this.secLSB = document.getElementById(secLSB);

       this.start = document.getElementById(start);
       this.stop = document.getElementById(stop);
       this.reset = document.getElementById(reset);

       this.display = document.getElementById(display);

       this.minutes = 0;
       this.seconds = 0;

       this.intervalId = null;

    //    this.display.addEventListener('input', (event)=>{this.onInput(event)});

    //    this.start.addEventListener('cilck', ()=>{this.onStart()});
    //    this.stop.addEventListener('click', ()=>{this.onStop()});
    //    this.reset.addEventListener('click', ()=>{this.onReset()});

        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onInput = this.onInput.bind(this);


       this.display.addEventListener('input', this.onInput);

       this.start.addEventListener('click', this.onStart);
       this.stop.addEventListener('click', this.onStop);
       this.reset.addEventListener('click', this.onReset);
    }

    onStart() {
        console.log("start the timer");
        this.display.classList.add('progress');
        this.setInputDisabledSatus(true);
        this.setControls(true, false);
        this.setTime();
        this.startTimer();
    }

    setTime() {
        this.minutes = parseInt(this.minMSB.value)*10 + parseInt(this.minLSB.value);
        console.log(this.minutes);
        this.seconds = parseInt(this.secMSB.value)*10 + parseInt(this.secLSB.value);
        console.log(this.seconds);
    }

    startTimer(){

        if(this.minutes === 0 && this.seconds === 0){
            // this.onReset();
            return
        }

        this.intervalId = setInterval(()=>{ // 1,2,3 ,4 ... last timerID
            if(this.minutes === 0 && this.seconds === 0){
                this.onReset();
            }
           
            this.seconds-=1;

            if(this.seconds<0) {
             this.seconds = 59;
             this.minutes-=1;
            }
           this.setDisplay(this.minutes, this.seconds);
        }, 1000);
    }

    /**
     * Method is used for enable/disable the input display
     * @param {for minutes minMSB, minLSB} mins 
     * @param {for seconds secMSB, secLSB} secs 
     */
    setDisplay(mins, secs) {
     this.minMSB.value = String(Math.floor(mins/10));
     this.minLSB.value = String(mins%10);
     this.secMSB.value = String(Math.floor(secs/10));
     this.secLSB.value = String(Math.floor(secs%10));
    }

    setInputDisabledSatus(isDisabled=false) {
        this.minMSB.disabled = isDisabled;
        this.minLSB.disabled = isDisabled;
        this.secMSB.disabled = isDisabled;
        this.secLSB.disabled = isDisabled;
    }

    setControls(startStaus=false, stopStaus=false) {
        this.start.disabled = startStaus;
        this.stop.disabled = stopStaus;
    }

    onStop() {
        this.display.classList.remove('progress');
        this.setInputDisabledSatus(false);
        this.setControls(false, true);
        clearInterval(this.intervalId);
    }

    onReset() { // Please do it in your home work
      this.resetTimerValue();
      clearInterval(this.intervalId);
    }

    resetTimerValue(){
        this.minMSB.value = 0;
        this.minLSB.value = 0;
        this.secMSB.value = 0;
        this.secLSB.value = 0;
    }

    onInput(event) {
        const value = Number(event.data);

        if(Number.isInteger(value)){
            if(this.minMSB === document.activeElement){
                this.onValueEntry(this.minMSB, this.minLSB, value, 0, 5);
            } else if(this.minLSB === document.activeElement) {
                this.onValueEntry(this.minLSB, this.secMSB, value, 0, 9);
            } else if(this.secMSB === document.activeElement) {
                this.onValueEntry(this.secMSB, this.secLSB, value, 0, 5);
            } else if (this.secLSB === document.activeElement) {
                this.onValueEntry(this.secLSB, null,value,  0, 9);
            }
        }
    }

    onValueEntry(target, nextTarget, value, minAllowed, maxAllowed) {
        if(value>=minAllowed && value<= maxAllowed) {
            target.value = value;
            if(nextTarget) {
                nextTarget.focus();
                nextTarget.select();
            } else {
                target.value = 0;
                target.select();
            }
        }
    }
}

new Timer("#minMSB", "minLSB", "secMSB", "secLSB", "start", "stop", "reset", "display");