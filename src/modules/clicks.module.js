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
    const timeout = setTimeout(()=> {
      this.#analyticsResultsContainer(counterSingle, counterDouble, total)
      document.removeEventListener('click', SingleHandler)
      document.removeEventListener('dblclick', DoubleHandler)
      total = 0
      counterSingle = 0
      counterDouble = 0
    },6000)
    setInterval(()=> {
      const countDown = document.querySelector('.countdown')
      if (!countDown) {
        clearTimeout(timeout)
      }
    },1)
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

<<<<<<< HEAD
    setTimeout(() => {
          this.#analyticsResultsContainer();
          this.#singleClick = 0;
          this.#doubleClick = 0;
    }, ms);
=======
>>>>>>> 2730e95d8ecc412837f428165dc76d0060de5446
  }
  toHTML() {
    return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
  }
}