import {Menu} from './core/menu'

export class ContextMenu extends Menu {
   #arrayOfModules;

   constructor() {
      super('#menu');
      this.#arrayOfModules = [];
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
      } else {
         this.el.innerHTML += modules.toHTML()
         this.#arrayOfModules.push(modules)
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
         }
      })
   }
}
