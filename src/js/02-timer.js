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
    // let convChosenDate = convertMs(chosenDate);
    let intervalId = 0;

    if (dateNow >= chosenDate) {
      timer.start.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future', {
        width: '280px',
        borderRadius: '40px',
      });
    } else {
      timer.start.disabled = false;
      // console.log(convChosenDate);
      // console.log(convertMs(dateNow));

      timer.start.addEventListener('click', () => {
        timer.start.disabled = true;
        timer.input.disabled = true;

        intervalId = setInterval(handlerTimer, 1000);
      });
    }

    function handlerTimer() {
      const dateNow = new Date();

      let remainingTime = chosenDate - dateNow;
      let remainingSeconds = Math.floor(remainingTime / 1000);

      let remDays = Math.floor(remainingSeconds / (24 * 60 * 60));
      timer.days.textContent = addLeadingZero(remDays);

      let remHours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
      timer.hours.textContent = addLeadingZero(remHours);

      let remMinutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
      timer.minutes.textContent = addLeadingZero(remMinutes);

      let remSeconds = Math.floor(remainingSeconds % 60);
      timer.seconds.textContent = addLeadingZero(remSeconds);

      if (dateNow >= chosenDate) {        
        Notiflix.Notify.info(
          `Timer stoped, it's ${selectedDates[0].toLocaleString()}`,
          {
            width: '280px',
            borderRadius: '40px',
          }
        );
        clearInterval(intervalId);
        timer.days.textContent = '00';
        timer.hours.textContent = '00';
        timer.minutes.textContent = '00';
        timer.seconds.textContent = '00';
      }
    }
  },
};

flatpickr(timer.input, options);

function addLeadingZero(value) {
  return value.toLocaleString().padStart(2, 0);
}

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour + 3);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }
