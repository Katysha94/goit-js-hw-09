import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const timerEL = document.querySelector(".timer");
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]')
const seconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
          startBtn.disabled = true;
      } else {
          Notiflix.Notify.success('Click on "Start"')
          startBtn.disabled = false;
      }
  },
};
flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        startBtn.disabled = true;
        let countdown = new Date(inputEl.value) - new Date();
        if (countdown >= 0) {
        let convertObj = convertMs(countdown);
            days.textContent = addLeadingZero(convertObj.days);
            hours.textContent = addLeadingZero(convertObj.hours);
            minutes.textContent = addLeadingZero(convertObj.minutes);
            seconds.textContent = addLeadingZero(convertObj.seconds)    
        } else {
         clearInterval(timerId);
        }
    }, 1000);
});
