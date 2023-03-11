import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

//styling timer
const timer = document.querySelector('.timer');
const timerLabel = document.querySelectorAll('.label');
const timerValue = document.querySelectorAll('.value');
const timerFields = document.querySelectorAll('.field');

timer.style.padding = '50px';
timer.style.display = 'flex';
timer.style.gap = '30px';

timerFields.forEach(field => {
  field.style.display = 'flex';
  field.style.flexDirection = 'column';
  field.style.alignItems = 'center';
});

timerLabel.forEach(label => {
  label.style.textTransform = 'uppercase';
  label.style.fontWeight = '500';
  label.style.fontSize = '12px';
});

timerValue.forEach(value => {
  value.style.fontFamily = 'Cambria, serif';
  value.style.fontWeight = '500';
  value.style.fontSize = '50px';
  value.style.padding = '0';
  value.style.margin = '0';
});

let selectedDateMS;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    function compareDates() {
      if (selectedDates[0].getTime() < new Date().getTime()) {
        Notify.failure('Please choose a date in the future');
      } else {
        startBtn.disabled = false;
      }
    }
    compareDates();
    selectedDateMS = selectedDates[0].getTime();
  },
};

let timerId = null;

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
  const valueToString = value.toString();
  return valueToString.padStart(2, '0');
}

function setCounter() {
  timerId = setInterval(() => {
    const actualDateMS = new Date().getTime();
    if (selectedDateMS >= actualDateMS) {
      const ms = selectedDateMS - actualDateMS;
      const convertedTime = convertMs(ms);

      days.textContent = addLeadingZero(convertedTime['days']);
      hours.textContent = addLeadingZero(convertedTime['hours']);
      minutes.textContent = addLeadingZero(convertedTime['minutes']);
      seconds.textContent = addLeadingZero(convertedTime['seconds']);
    }
    return;
  }, 1000);
}

startBtn.disabled = true;

flatpickr(dateInput, options);

startBtn.addEventListener('click', setCounter);
