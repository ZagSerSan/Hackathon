import {Module} from '../core/module'
import {random} from '../utils';

export class ShapeModule extends Module {
   #figure;
	#body;

   constructor() {
      super('shape', 'Случайная фигура')
      this.#body = document.body;
		this.#figure = document.createElement('div');
		this.#figure.className = "circle";
   }
   #setColor(elem) {
		elem.style.backgroundColor = `rgb(${random(10, 230)},${random(90, 200)},${random(30, 210)})`;
	}
   trigger() {
      // this.clearBody();
		const {width, height} = this.#body.getBoundingClientRect();
		const sizeFigure = random(25, 100);
		const x = random(0, width - sizeFigure);
		const y = random(0, height - sizeFigure);
		this.#body.style.position = "relative";
		this.#figure.style.position = "absolute";
		this.#figure.style.width = `${sizeFigure}px`;
		this.#figure.style.height = `${sizeFigure}px`;
		this.#figure.style.top = `${y}px`;
		this.#figure.style.left = `${x}px`;
		this.#figure.style.borderRadius = `${random(0, 50)}%`;
		this.#setColor(this.#figure);
		this.#body.append(this.#figure);
   }
   toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}