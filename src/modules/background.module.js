import {Module} from '../core/module'

export class BackgroundModule extends Module {
   constructor() {
      super('background', 'Случайный фон')
   }
   trigger() {
      // функционал модуля
      function getRandomInt(max) {
         return Math.floor(Math.random() * max);
      }
      // количество изображений
      const imageCount = 15
      document.body.style.backgroundImage = `url(./src/assets/bgimg/bg_${getRandomInt(imageCount)}.webp)`
      document.body.style.backgroundPosition = 'center'
      document.body.style.backgroundSize = 'cover'
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}