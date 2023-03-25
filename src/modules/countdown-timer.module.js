import {Module} from "../core/module";

export default class CountdownTimerModule extends Module {
      constructor() {super(`data-role`, `Таймер отсчета`);}

      #countdownTimerBlock() {
            const timeInputForm = document.createElement(`form`);
            timeInputForm.id = `time-input-form`;

            const hoursInput = document.createElement(`input`);
            hoursInput.type = `text`;
            hoursInput.id = `hours`;
            hoursInput.name = `hours`;

            const hoursLabel = document.createElement(`label`);
            hoursLabel.textContent = ` hh `;
            hoursLabel.htmlFor = `hours`;

            const minutesInput = document.createElement(`input`);
            minutesInput.type = `text`;
            minutesInput.id = `minutes`;
            minutesInput.name = `minutes`;

            const minutesLabel = document.createElement(`label`);
            minutesLabel.textContent = ` mm `;
            minutesLabel.htmlFor = `minutes`;

            const secondsInput = document.createElement(`input`);
            secondsInput.type = `text`;
            secondsInput.id = `seconds`;
            secondsInput.name = `seconds`;

            const secondsLabel = document.createElement(`label`);
            secondsLabel.textContent = ` ss `;
            secondsLabel.htmlFor = `minutes`;

            const submitBtn = document.createElement(`input`);
            submitBtn.id = `submit-button`;
            submitBtn.type = `button`;
            submitBtn.value = `Start countdown`;

            timeInputForm.append(hoursInput, hoursLabel, minutesInput, minutesLabel, secondsInput, secondsLabel, submitBtn);
            return timeInputForm;
      }

      #startCountdownTimer(e) {
            let hhInput = Number(document.querySelector(`#hours`).value);
            let mmInput = Number(document.querySelector(`#minutes`).value);
            let ssInput = Number(document.querySelector(`#seconds`).value);

            let userSetTimer = new Date();

            const newHour = userSetTimer.getHours() + hhInput;
            const newMin = userSetTimer.getMinutes() + mmInput;
            const newSec = userSetTimer.getSeconds() + ssInput + 2;
            userSetTimer.setHours(newHour);
            userSetTimer.setMinutes(newMin);
            userSetTimer.setSeconds(newSec);

            const timer = document.createElement(`span`);

            const countdownTimer = setInterval(() => {
                  const now = new Date().getTime();
                  let difference = userSetTimer.getTime() - now;

                  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                  if (difference < 0) {
                        clearInterval(countdownTimer);
                        timer.textContent = `Timer has expired! Goodbye!`;
                        document.body.append(timer);
                        setTimeout(() => timer.style.display = `none`, 2000);
                  } else {
                        timer.textContent = `${('0' + hours).slice(-2)}hh ${('0' + minutes).slice(-2)}mm ${('0' + seconds).slice(-2)}ss`;
                        document.body.append(timer);
                  }
            }, 1000);
      }

      trigger() {
            console.log(`CountdownTimerModule trigger method`);
            document.body.append(this.#countdownTimerBlock());
            const btn = document.querySelector(`#submit-button`);
            btn.addEventListener(`click`, event => {
                  const timeInputForm = document.querySelector(`#time-input-form`);
                  timeInputForm.style.display = `none`;
                  this.#startCountdownTimer(event);
            });
      }
}