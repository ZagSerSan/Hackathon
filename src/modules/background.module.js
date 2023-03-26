import {Module} from '../core/module'

export class BackgroundModule extends Module {
   constructor() {
      super('background', 'Случайный фон')
   }
   trigger() {
      // функционал модуля
      console.log('Случайный фон сработал!');
      document.body.style.backgroundColor = `#${Math.random().toString(16).substring(2,8)}`;
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}