import Notiflix from 'notiflix';

const form = document.querySelector('form');
const btn = document.querySelector('[type="submit"]');

btn.addEventListener('click', handler);

function handler(evt){
  evt.preventDefault();
  let delay = parseInt(form.elements.delay.value);
  let step = parseInt(form.elements.step.value);
  let amount = parseInt(form.elements.amount.value);
  console.log(delay, step, amount);

  for (let i = 1; i <= amount; i += 1, delay += step) {
    setTimeout(() => createPromise(i, delay), delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
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

