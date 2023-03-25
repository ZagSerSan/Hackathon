import {Menu} from './core/menu'

export class ContextMenu extends Menu {
   constructor() {
      super('#menu');
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
         });
      } else {
         this.el.innerHTML += modules.toHTML()
      }
   }
}
