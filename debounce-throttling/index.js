// create a debounce() polyfill implementation
const btnDebounce = document.querySelector('.increment_btn_debounce');
const btnPressedDebounce = document.querySelector('.increment_pressed_debounce');
const countDebounce = document.querySelector('.increment_count_debounce');

var pressedCountDebounce = 0;
var triggerCountDebounce = 0;

const myDebounce = (cb, delay) => {
    let timer;

    return function(...args){
        if(timer){
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            cb(...args);
        }, delay)
    }
};

const debouncedCount = myDebounce(() => {
    triggerCountDebounce += 1;
    countDebounce.innerHTML = triggerCountDebounce;
}, 2000);


btnDebounce.addEventListener('click', () => {
    btnPressedDebounce.innerHTML = ++pressedCountDebounce;

    debouncedCount();
});



// create a throttle() polyfill implementation
const btnThrottle = document.querySelector('.increment_btn_throttle');
const btnPressedTrottle = document.querySelector('.increment_pressed_throttle');
const countThrottle = document.querySelector('.increment_count_throttle');

var pressedCountThrottle = 0;
var triggerCountThrottle = 0;

// let start = new Date().getTime();

const myThrottle = (cb, delay) => {
    let lastCall = 0;

    return (...args) => {
        let now = new Date().getTime();
        if(now - lastCall < delay){
            return;
        }
        lastCall = now;
        return cb(...args);
    }
}

const throttled = myThrottle(() => {
    triggerCountThrottle += 1;
    countThrottle.innerHTML = triggerCountThrottle;
}, 2000);

btnThrottle.addEventListener('click', () => {
    btnPressedTrottle.innerHTML = ++pressedCountThrottle;
    // const now = new Date().getTime();
    // const seconds = (now-start)/1000;
    // console.log(seconds.toFixed());
    throttled();
})