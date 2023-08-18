import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const timer = {
  input: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),
};

timer.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let dateNow = new Date();
    let chosenDate = selectedDates[0];
    let convChosenDate = convertMs(chosenDate);
    let intervalId = 0;

    if (dateNow - chosenDate > 0) {
      timer.start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '280px', 
        borderRadius: '40px',
      });
    } else {
      timer.start.disabled = false;
      console.log(convChosenDate);
      console.log(convertMs(dateNow));

      timer.start.addEventListener('click', () => {
        timer.start.disabled = true;
        timer.input.disabled = true;

        intervalId = setInterval(handlerTimer, 1000);
      });
    }

    function handlerTimer() {
      const dateNow = new Date();
      if (
        convChosenDate.days === convertMs(dateNow).days &&
        convChosenDate.hours === convertMs(dateNow).hours &&
        convChosenDate.minutes === convertMs(dateNow).minutes &&
        convChosenDate.seconds === convertMs(dateNow).seconds
      ) {        
        Notiflix.Notify.info(
          `Timer stoped, it's ${selectedDates[0].toLocaleString()}`, {
            width: '280px',
            borderRadius: '40px',
          }
        );
        clearInterval(intervalId);
      }

      let remDays = convChosenDate.days - convertMs(dateNow).days;
      timer.days.textContent = addLeadingZero(remDays);

      let remHours =
        convChosenDate.hours < convertMs(dateNow).hours
          ? 24 - convertMs(dateNow).hours + convChosenDate.hours
          : convChosenDate.hours - convertMs(dateNow).hours;
      timer.hours.textContent = addLeadingZero(remHours);

      let remMinutes =
        convChosenDate.minutes < convertMs(dateNow).minutes
          ? 60 - convertMs(dateNow).minutes + convChosenDate.minutes
          : convChosenDate.minutes - convertMs(dateNow).minutes;
      timer.minutes.textContent = addLeadingZero(remMinutes);

      let remSeconds =
        convChosenDate.seconds < convertMs(dateNow).seconds
          ? 60 - convertMs(dateNow).seconds + convChosenDate.seconds
          : convChosenDate.seconds - convertMs(dateNow).seconds;
      timer.seconds.textContent = addLeadingZero(remSeconds);
    }
  },
};

flatpickr(timer.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour + 3);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toLocaleString().padStart(2, 0);
}
