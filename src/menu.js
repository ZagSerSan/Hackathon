import {Menu} from './core/menu'

export class ContextMenu extends Menu {
   #arrayOfModules;
   #startHtmlTemplate;

   constructor() {
      super('#menu');
      this.#arrayOfModules = [];
      //todo
      // обнуление
      // this.#startHtmlTemplate = '';
      // this.modulIsActive = false;
   }
   open() {
      document.addEventListener("contextmenu", (event) => {
         event.preventDefault();
         this.el.classList.add('open');
         this.el.style.top = `${event.offsetY}px`;
         this.el.style.left = `${event.offsetX}px`;
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
   menuItemListener() {
      this.el.addEventListener('click', event => {
         // проверка был ли клик по айтему меню, а не по самому меню
         if (event.target.hasAttribute('data-type')) {
            // найти модуль в массиве
            const findedModule = this.#arrayOfModules.find( item => {
               return item.type === event.target.dataset.type
            })
            // включение модуля
            findedModule.trigger()

            //todo
            /* обнуление
            if (this.modulIsActive) {
               console.log('this.modulIsActive');
               document.body.removeAttribute('style');
               findedModule.trigger()
            } else {
               findedModule.trigger()
               this.modulIsActive = true
            }
            */
         }
      })
   }
}
