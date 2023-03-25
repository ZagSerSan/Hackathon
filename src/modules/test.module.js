import {Module} from '../core/module'

export class TestModule extends Module {
   constructor() {
      super('test', 'Тестовый модуль')
   }
   trigger() {
      console.log('Тестовый модуль сработал!');
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}