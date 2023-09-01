import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const inputEl = document.querySelector("#datetime-picker");
const startBtn = document.querySelector('button[data-start]');
const timerEL = document.querySelector(".timer");
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const seconds = document.querySelector('span[data-seconds]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (selectedDates < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          Notiflix.Notify.success()
          startBtn.disabled = false;
      }
  },
};
flatpickr(selector, options)