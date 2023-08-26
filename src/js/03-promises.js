import Notiflix from 'notiflix';

const form = document.querySelector('form');
const btn = document.querySelector('[type="submit"]');

btn.addEventListener('click', handler);

function handler(evt) {
  evt.preventDefault();
  let initialDelay = parseInt(form.elements.delay.value);
  let step = parseInt(form.elements.step.value);
  let amount = parseInt(form.elements.amount.value);
  console.log(initialDelay, step, amount);

  for (let i = 1; i <= amount; i += 1) {
    const delay = initialDelay + (i - 1) * step;
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });
