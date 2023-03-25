import {Module} from '../core/module'

export class ClicksModule extends Module {
   constructor() {
      super('analitics', 'Аналитика кликов')
   }
   trigger() {
      console.log('Аналитика кликов сработала!');
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}