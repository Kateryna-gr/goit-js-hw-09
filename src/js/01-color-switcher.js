function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btns = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
btns.stop.disabled = true;
let intervalId = null;

btns.start.addEventListener('click', handlerStart);
function handlerStart() {
  btns.start.disabled = true;
  btns.stop.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval(
    () => (document.body.style.backgroundColor = getRandomHexColor()),
    1000
  );
}

btns.stop.addEventListener('click', handlerStop);
function handlerStop() {
  clearInterval(intervalId);
  btns.start.disabled = false;
  btns.stop.disabled = true;
}
