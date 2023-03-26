import {Menu} from './core/menu'

export class ContextMenu extends Menu {
   #arrayOfModules;
   #startHtmlTemplate;

   constructor() {
      super('#menu');
      this.#arrayOfModules = [];
      //todo
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
      //todo
      /* обнуление
      */
     const body = document.querySelector('body');
      // document.body.removeAttribute('style');
      body.innerHTML = '';
      body.removeAttribute('style');
      body.append(this.#startHtmlTemplate);

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
