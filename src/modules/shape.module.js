import {Module} from '../core/module'

export class ShapeModule extends Module {
   constructor() {
      super('shape', 'Случайная фигура')
   }
   trigger() {
      console.log('Рандомная фигура сработала!');
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}