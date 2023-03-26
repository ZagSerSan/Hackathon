import {Menu} from './core/menu'

export class ContextMenu extends Menu {
   #arrayOfModules;
   #startHtmlTemplate;

   constructor() {
      super('#menu');
      this.#arrayOfModules = [];
      // обнуление
      this.#startHtmlTemplate = '';
      this.modulIsActive = false;
   }
   open() {
      document.addEventListener("contextmenu", (event) => {
         event.preventDefault();
         this.el.classList.add('open');
         this.el.style.top = `${event.clientY}px`;
         this.el.style.left = `${event.clientX}px`;
      });
   }
   close() {
      document.addEventListener("click", (event) => {
         event.preventDefault();
         this.el.classList.remove('open');
      });
   }
   add(modules) {
      if (Array.isArray(modules)) {
         modules.forEach(modul => {
            this.el.innerHTML += modul.toHTML()
            this.#arrayOfModules.push(modul)
         });
         // стартовый html шаблон для обнуления
         this.#startHtmlTemplate = this.el;
      } else {
         this.el.innerHTML += modules.toHTML()
         this.#arrayOfModules.push(modules)
         // стартовый html шаблон для обнуления
         this.#startHtmlTemplate = this.el;
      }
   }
   clear() {
      const body = document.querySelector('body');
      body.innerHTML = '';
      body.removeAttribute('style');
      body.append(this.#startHtmlTemplate);

      //todo удаление таймера
      const timerIsContain = document.querySelector('#time-input-form')
      const timer = document.querySelector('.timer')
      if (timerIsContain) {
         timerIsContain.remove();
         timer.style.display = 'none';
      }

      const countDown = document.querySelector('.countdown')
      const analitycs = document.querySelector('.analytics-results')

      if (countDown || analitycs) {
         countDown.remove()
         analitycs.remove()

      }

      this.modulIsActive = true
   }
   menuItemListener() {
      this.el.addEventListener('click', event => {
         // проверка был ли клик по айтему меню, а не по самому меню
         if (event.target.hasAttribute('data-type')) {
            // найти модуль в массиве
            const findedModule = this.#arrayOfModules.find( item => {
               return item.type === event.target.dataset.type
            })
            // включение модуля
            if (this.modulIsActive) {
               this.clear()
            }
            findedModule.trigger()
            this.modulIsActive = true
         }
      })
   }
}
