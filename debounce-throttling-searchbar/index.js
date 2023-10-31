const input = document.querySelector('input');
const defaultText = document.getElementById('default');
const debounceText = document.getElementById('debounce');
const throttleText = document.getElementById('throttle');

input.addEventListener('input', (e) => {
    defaultText.innerText = e.target.value;
    updateDebounceText(e.target.value);
    updateThrottleText(e.target.value);
});


// Delaying everything by 1 seconds -> not a debouncing
// const debounce = (cb, delay=1000) => {
//     return (...args) => {
//         setTimeout(() => {
//             cb(...args)
//         }, delay)
//     }
// };


const debounce = (cb, delay=1000) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);  // clear current timeout when call this function and create new one

        timer = setTimeout(() => {
            cb(...args)
        },delay)
    }
}

const throttle = (cb, delay=1000) => {
    let shouldWait = false;
    let waitArgs;

    const timeoutFunc = () => {
        if(waitArgs == null){
            shouldWait = false;
        }
        else{
            cb(...waitArgs);
            waitArgs = null;
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args) => {
        if(shouldWait){
            waitArgs = args;
            return;
        }
        cb(...args);
        shouldWait = true;

        setTimeout(timeoutFunc ,delay);
    }
}


const updateDebounceText = debounce((text) => {
    debounceText.innerText = text;
}, 2000);

const updateThrottleText = throttle((text) => {
    throttleText.innerText = text;
}, 2000);