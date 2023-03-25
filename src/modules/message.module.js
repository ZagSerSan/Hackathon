import {Module} from '../core/module'

export class Message extends Module {
   constructor() {
      super('message', 'Случайное сообщение')
   }
   trigger() {
      // функционал модуля
      function  getRandomQuote() {
         const quotes = [
         "Жизнь прекрасна, если мы сами делаем ее такой.",
         "Никогда не сдавайся. Потому что в тот момент, когда ты сдаешься, это может быть именно тот момент, когда успех уже близок.",
         "Главное – не забывайте, кто вы есть, и не теряйте своих идеалов в жизни.",
         "У тебя нет шансов, если ты не попробуешь.",
         "Никогда не слишком поздно стать тем, кем ты мог бы быть."
         ];
         const randomIndex = Math.floor(Math.random() * quotes.length);
         return quotes[randomIndex];
      }

      const quote = getRandomQuote();
      const message = document.createElement("div");
      message.classList.add("message");
      message.textContent = quote;
   
      document.body.appendChild(message);
      const x = event.clientX;
      const y = event.clientY;
      
      setTimeout(() => {
      document.body.removeChild(message);
      }, 5000)
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}
















