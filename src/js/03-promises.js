import Notiflix from 'notiflix';

const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const submitBtn = document.querySelector('button');
const amountInput = document.querySelector('input[name="amount"]');

let timerId = null;
let intervalId = null;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
    return Promise.resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    // Reject
    return Promise.reject(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

function startPromises(e) {
  e.preventDefault();
  const delayInputValueToNmbr = Number(delayInput.value);
  const stepInputValueToNmbr = Number(stepInput.value);
  const amountInputValueToNmbr = Number(amountInput.value);
  timerId = setTimeout(() => {
    let actualDelay = delayInputValueToNmbr;
    let i = 1;
    intervalId = setInterval(() => {
      if (i <= amountInputValueToNmbr) {
        createPromise(i, actualDelay)
          .then(success => Notiflix.Notify.success(success))
          .catch(failure => Notiflix.Notify.failure(failure));
        i++;
        actualDelay += stepInputValueToNmbr;
      } else {
        clearInterval(intervalId);
      }
    }, stepInputValueToNmbr);
  }, delayInputValueToNmbr);
}

submitBtn.addEventListener('click', startPromises);
