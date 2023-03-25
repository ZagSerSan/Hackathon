import {Module} from '../core/module'

export class BackgroundModule extends Module {
   constructor() {
      super('background', 'Случайный фон')
   }
   test() {
      console.log('test');
   }
}