import './clicks.css';
import {Module} from '@/core/module';

export default class ClicksModule extends Module {

  constructor() {
    super(`analytics`, `Аналитика кликов`);

  }

  #clicksCounter() {

    let counterSingle = -1
    let counterDouble = 0
    let total = -1

    function SingleHandler () {
      counterSingle++
      total++
    }

    function DoubleHandler() {
      counterDouble++
    }

    document.addEventListener(`click`, SingleHandler);
    document.addEventListener(`dblclick`, DoubleHandler);
    const countDown = document.querySelector('.countdown')
    const timeout = setTimeout(()=> {
      this.#analyticsResultsContainer(counterSingle, counterDouble, total)
      document.removeEventListener('click', SingleHandler)
      document.removeEventListener('dblclick', DoubleHandler)
      total = 0
      counterSingle = 0
      counterDouble = 0
    },6000)
  }

  #countDownClock(ms) {
    const countdown = document.createElement(`span`);
    countdown.dataset.id = `countdown`;
    countdown.className = 'countdown';
    const downloadTimer = setInterval(() => {
          if (ms < 0) {
                clearInterval(downloadTimer);
                countdown.style.display = `none`;
          } else {
                countdown.textContent = ms;
          }
          ms--;
    }, 1000);
    document.body.append(countdown);
  }

  #analyticsResultsContainer(single, double, total) {
    const divItem = document.createElement(`div`);
    divItem.className = `analytics-results`;

    const singleCLickItem = document.createElement(`p`);
    singleCLickItem.className = `single-click-result`;
    singleCLickItem.textContent = `Single clicks: ${single}; `;

    const doubleClickItem = document.createElement(`p`);
    doubleClickItem.className = `double-click-result`;
    doubleClickItem.textContent = `Double clicks:  ${double}; `;

    const totalNoOfClicks = document.createElement(`p`);
    totalNoOfClicks.className = `total-number-clicks`;
    totalNoOfClicks.textContent = `Total number of clicks:  ${total}; `;

    divItem.append(singleCLickItem, doubleClickItem, totalNoOfClicks);
    document.body.append(divItem);
  }

  trigger() {
    let ms = 6000;
    this.#countDownClock((ms/1000) - 1);
    this.#clicksCounter();
  }
  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}

// тут правильный таймер
/*
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
    hoursInput.pattern = `[0-2][0-3]`;
    hoursInput.required = true;

    const hoursLabel = document.createElement(`label`);
    hoursLabel.textContent = ` hours `;
    hoursLabel.htmlFor = `hours`;

    const minutesInput = document.createElement(`input`);
    minutesInput.type = `text`;
    minutesInput.id = `minutes`;
    minutesInput.name = `minutes`;
    minutesInput.pattern = `[0-5][0-9]`;
    minutesInput.required = true;

    const minutesLabel = document.createElement(`label`);
    minutesLabel.textContent = ` minutes `;
    minutesLabel.htmlFor = `minutes`;

    const secondsInput = document.createElement(`input`);
    secondsInput.type = `text`;
    secondsInput.id = `seconds`;
    secondsInput.name = `seconds`;
    secondsInput.pattern = `[0-5][0-9]`;
    secondsInput.required = true;

    const secondsLabel = document.createElement(`label`);
    secondsLabel.textContent = ` seconds `;
    secondsLabel.htmlFor = `minutes`;

    const submitBtn = document.createElement(`input`);
    submitBtn.id = `submit-button`;
    submitBtn.type = `button`;
    submitBtn.value = `Start countdown`;

    const errorMsgBox = document.createElement(`span`);
    errorMsgBox.className = `error-message-box`;
    errorMsgBox.textContent = ``;
    errorMsgBox.style.display = `none`;

    const div_collumn_1 = document.createElement('div');
    const div_collumn_2 = document.createElement('div');
    const div_collumn_3 = document.createElement('div');
    const div_column_4 = document.createElement(`div`);

    div_collumn_1.className = 'collumn';
    div_collumn_2.className = 'collumn';
    div_collumn_3.className = 'collumn';
    div_column_4.className = 'collumn';

    div_collumn_1.append(errorMsgBox);
    div_collumn_2.append(hoursInput, hoursLabel);
    div_collumn_3.append(minutesInput, minutesLabel);
    div_column_4.append(secondsInput, secondsLabel);

    timeInputForm.append(div_collumn_1, div_collumn_2, div_collumn_3, div_column_4, submitBtn);
    return timeInputForm;
  }

  #startCountdownTimer() {
    let hhInput = Number(document.querySelector(`#hours`).value);
    let mmInput = Number(document.querySelector(`#minutes`).value);
    let ssInput = Number(document.querySelector(`#seconds`).value);

    const timer = document.createElement(`span`);
    timer.className = 'timer';

    const isInputValid = this.#validateInput(hhInput, mmInput, ssInput);
    if (isInputValid) {
      let userSetTimer = new Date();

      const newHour = userSetTimer.getHours() + hhInput;
      const newMin = userSetTimer.getMinutes() + mmInput;
      const newSec = userSetTimer.getSeconds() + ssInput + 2;
      userSetTimer.setHours(newHour);
      userSetTimer.setMinutes(newMin);
      userSetTimer.setSeconds(newSec);

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
    } else {
      const errorMsgBox = document.querySelector(`.error-message-box`);
      errorMsgBox.textContent = `Invalid input!`;
      errorMsgBox.style.display = `block`;
      document.querySelector(`#time-input-form`).style.display = `inline`;
    }
  }

  #validateInput(hours, minutes, seconds) {
    return /^[0-23]+$/.test(hours) && /^[0-59]+$/.test(minutes) && /^[0-59]+$/.test(seconds);
  }

  trigger() {
    document.body.append(this.#countdownTimerBlock());
    document.querySelector(`#submit-button`).addEventListener(`click`, event => {
      event.preventDefault();
      document.querySelector(`#time-input-form`).style.display = `none`;
      this.#startCountdownTimer();
    });
  }
  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}
*/

//=====================

/**
 * 
 * 
 * import './clicks.css';
import {Module} from '@/core/module';

export default class ClicksModule extends Module {

  constructor() {
    super(`analytics`, `Аналитика кликов`);

  }

  #clicksCounter() {

    let counterSingle = -1
    let counterDouble = 0
    let total = -1

    function SingleHandler () {
      counterSingle++
      total++
    }

    function DoubleHandler() {
      counterDouble++
    }

    document.addEventListener(`click`, SingleHandler);
    document.addEventListener(`dblclick`, DoubleHandler);
    const countDown = document.querySelector('.countdown')
    const timeout = setTimeout(()=> {
      this.#analyticsResultsContainer(counterSingle, counterDouble, total)
      document.removeEventListener('click', SingleHandler)
      document.removeEventListener('dblclick', DoubleHandler)
      total = 0
      counterSingle = 0
      counterDouble = 0
    },6000)
    // setInterval(()=> {
    //   if (countDown) {
    //     console.log(countDown)
    //     console.log('123')
    //     clearTimeout(timeout)
    //   }
    // },1000)
  }


  #countDownClock(ms) {
    const countdown = document.createElement(`span`);
    countdown.dataset.id = `countdown`;
    countdown.className = 'countdown';
    const downloadTimer = setInterval(() => {
          if (ms < 0) {
                clearInterval(downloadTimer);
                countdown.style.display = `none`;
          } else {
                countdown.textContent = ms;
          }
          ms--;
    }, 1000);
    document.body.append(countdown);
  }

  #analyticsResultsContainer(single, double, total) {
    const divItem = document.createElement(`div`);
    divItem.className = `analytics-results`;

    const singleCLickItem = document.createElement(`p`);
    singleCLickItem.className = `single-click-result`;
    singleCLickItem.textContent = `Single clicks: ${single}; `;

    const doubleClickItem = document.createElement(`p`);
    doubleClickItem.className = `double-click-result`;
    doubleClickItem.textContent = `Double clicks:  ${double}; `;

    const totalNoOfClicks = document.createElement(`p`);
    totalNoOfClicks.className = `total-number-clicks`;
    totalNoOfClicks.textContent = `Total number of clicks:  ${total}; `;

    divItem.append(singleCLickItem, doubleClickItem, totalNoOfClicks);
    document.body.append(divItem);
  }

  trigger() {
    let ms = 6000;
    this.#countDownClock((ms/1000) - 1);
    this.#clicksCounter();
  }
  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}
 */