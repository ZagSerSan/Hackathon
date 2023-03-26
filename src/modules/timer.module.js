import {Module} from "@/core/module";
import './timer.css';

export default class CountdownTimerModule extends Module {

      constructor() {
            super('timer', `Таймер отсчета`);
      }

      #countdownTimerBlock() {
            const timeInputForm = document.createElement(`form`);
            timeInputForm.id = `time-input-form`;

            const hoursInput = document.createElement(`input`);
            hoursInput.type = `text`;
            hoursInput.id = `hours`;
            hoursInput.name = `hours`;

            const hoursLabel = document.createElement(`label`);
            hoursLabel.textContent = ` hours `;
            hoursLabel.htmlFor = `hours`;

            const minutesInput = document.createElement(`input`);
            minutesInput.type = `text`;
            minutesInput.id = `minutes`;
            minutesInput.name = `minutes`;

            const minutesLabel = document.createElement(`label`);
            minutesLabel.textContent = ` minutes `;
            minutesLabel.htmlFor = `minutes`;

            const secondsInput = document.createElement(`input`);
            secondsInput.type = `text`;
            secondsInput.id = `seconds`;
            secondsInput.name = `seconds`;

            const secondsLabel = document.createElement(`label`);
            secondsLabel.textContent = ` seconds `;
            secondsLabel.htmlFor = `minutes`;

            const submitBtn = document.createElement(`input`);
            submitBtn.id = `submit-button`;
            submitBtn.type = `button`;
            submitBtn.value = `Start countdown`;

            const div_collumn_1 = document.createElement('div');
            const div_collumn_2 = document.createElement('div');
            const div_collumn_3 = document.createElement('div');

            div_collumn_1.className = 'collumn';
            div_collumn_2.className = 'collumn';
            div_collumn_3.className = 'collumn';

            div_collumn_1.append(hoursInput, hoursLabel)
            div_collumn_2.append(minutesInput, minutesLabel)
            div_collumn_3.append(secondsInput, secondsLabel)

            timeInputForm.append(div_collumn_1, div_collumn_2, div_collumn_3, submitBtn);
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
            timer.className = 'timer';

            const countdownTimer = setInterval(() => {
                  const now = new Date().getTime();
                  let difference = userSetTimer.getTime() - now;

                  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                  if (difference < 0) {
                        clearInterval(countdownTimer);
                        timer.textContent = `Timer has expired! Goodbye!`;
                        setTimeout(() => timer.style.display = `none`, 2000);
                  } else {
                        timer.textContent = `${('0' + hours).slice(-2)}h ${('0' + minutes).slice(-2)}m ${('0' + seconds).slice(-2)}s`;
                  }
            }, 1000);

            document.body.append(timer);
      }

      trigger() {
            console.log(`CountdownTimerModule trigger method`);
            document.body.append(this.#countdownTimerBlock());
            const btn = document.querySelector(`#submit-button`);
            btn.addEventListener(`click`, event => {
                  console.log('123')
                  const timeInputForm = document.querySelector(`#time-input-form`);
                  timeInputForm.style.display = `none`;
                  this.#startCountdownTimer(event);
            });
      }
      toHTML() {
            return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
      }
}