import {Module} from '../core/module';

export default class ClicksModule extends Module {
      #singleClick;
      #doubleClick;
      constructor() {
            super(`analytics`, `Аналитика кликов`);
            this.#singleClick = -1;
            this.#doubleClick = 0;
      }

      #clicksCounter() {
            console.log(`Clicks counter function`);
            document.addEventListener(`click`, () => this.#singleClick++);
            document.addEventListener(`dblclick`, () => this.#doubleClick++);
      }

      #countDownClock(ms) {
            const countdown = document.createElement(`span`);
            countdown.dataset.id = `countdown`;
            const downloadTimer = setInterval(() => {
                  if (ms < 0) {
                        clearInterval(downloadTimer);
                        countdown.style.display = `none`;
                  } else {
                        countdown.textContent = ms;
                        document.body.append(countdown);
                  }
                  ms--;
            }, 1000);
      }

      #analyticsResultsContainer() {
            const divItem = document.createElement(`div`);
            divItem.className = `analytics-results`;

            const singleCLickItem = document.createElement(`span`);
            singleCLickItem.className = `single-click-result`;
            singleCLickItem.textContent = `Single clicks: ${this.#singleClick - (this.#doubleClick * 2)}; `;

            const doubleClickItem = document.createElement(`span`);
            doubleClickItem.className = `double-click-result`;
            doubleClickItem.textContent = `Double clicks: ${this.#doubleClick}; `;

            const totalNoOfClicks = document.createElement(`span`);
            totalNoOfClicks.className = `total-number-clicks`;
            totalNoOfClicks.textContent = `Total number of clicks: ${this.#singleClick}; `;

            divItem.append(singleCLickItem, doubleClickItem, totalNoOfClicks);
            document.body.append(divItem);
      }

      trigger() {
            let ms = 6000;
            this.#countDownClock((ms/1000) - 1);
            this.#clicksCounter();
            setTimeout(() => {
                  this.#analyticsResultsContainer();
            }, ms);
      }
}