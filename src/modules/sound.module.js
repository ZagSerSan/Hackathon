import { Module } from '../core/module';
import { random } from '../utils';
import sound1 from '../assets/sounds/1.mp3';
import sound2 from '../assets/sounds/2.mp3';
import sound3 from '../assets/sounds/3.mp3';
import sound4 from '../assets/sounds/4.mp3';
import sound5 from '../assets/sounds/5.mp3';
import sound6 from '../assets/sounds/6.mp3';

export class RandomSoundModule extends Module {
	#sounds;

	constructor() {
		super('sound', 'Случайный звук');
		this.#sounds = [
			new Audio(sound1),
			new Audio(sound2),
			new Audio(sound3),
			new Audio(sound4),
			new Audio(sound5),
			new Audio(sound6)
		];
	}

	trigger() {
		// this.clearBody();
	   const randomSoundIndex = random(0, this.#sounds.length - 1);
	   this.#sounds[randomSoundIndex].pause();
		this.#sounds[randomSoundIndex].currentTime = 0;
		this.#sounds[randomSoundIndex].play();
	}
	toHTML() {
      return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
   }
}