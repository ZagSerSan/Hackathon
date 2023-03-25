import {Module} from "../core/module";

import './custom.css';
import {random} from "../utils";


export default class CustomModule extends Module{

    constructor(type, text) {
        super(type, text);

        this.body = document.body
        this.game = document.createElement('div')
        this.title = document.createElement('h1')
        this.game.className = 'custom_game'


    }

    trigger() {
        super.trigger();

        this.body.classList.add('custom_open')
        this.body.append(this.game)

        this.title.textContent = 'Минное поле'
        this.title.className = 'title'

        this.game.append(this.title)

        let id = 1

        for (let i = 0; i < 4; i++) {
            let col = document.createElement('div')
            col.className = 'col'
            col.id = `${id}`

            this.game.append(col)
            for (let j = 0; j < 4; j++) {
                let row = document.createElement('div')
                if (i === 0) {
                    row.className = 'elem square_default'
                } else  {
                    row.className = 'elem square_default disabled'
                }

                row.id = `${id}`

                row.addEventListener('click',(e)=> {
                    const allSquares = document.querySelectorAll('.elem')

                    const randomizer = random(1,10)


                    if (randomizer <= 5) {
                        row.classList.add('square_ok')

                        if (+row.id > 0 && +row.id < 5) {
                            for (let i = 4; i < 8; i++) {
                                allSquares[i].classList.remove('disabled')
                            }
                            for (let i = 0; i < 4; i++) {
                                allSquares[i].classList.add('disabled')
                            }
                        }

                        if (+row.id > 4 && +row.id < 9) {
                            for (let i = 8; i < 12; i++) {
                                allSquares[i].classList.remove('disabled')
                            }
                            for (let i = 4; i < 8; i++) {
                                allSquares[i].classList.add('disabled')
                            }
                        }

                        if (+row.id > 8 && +row.id < 13) {
                            for (let i = 12; i < 16; i++) {
                                allSquares[i].classList.remove('disabled')
                            }
                            for (let i = 8; i < 12; i++) {
                                allSquares[i].classList.add('disabled')
                            }
                        }

                        if (+row.id > 12 && +row.id < 17) {
                            if (randomizer <= 5) {
                                const result = confirm('Вы победили! Хотите начать сначала?')
                                this.newGame(result)
                            }
                            for (let i = 12; i < 16; i++) {
                                allSquares[i].classList.add('disabled')
                            }
                        }

                    } else {

                        row.classList.add('square_defeated')
                        allSquares.forEach((item) => {
                            item.classList.add('disabled')
                        })
                        const result = confirm('Повезет в следущий раз, хотите попробовтаь еще раз?')
                        this.newGame(result)
                    }
                })
                col.append(row)
                id++
            }
        }
    }

    newGame(condition) {
        if (condition) {
           const squares = document.querySelectorAll('.elem')

            for (let i = 0; i <= 3; i++) {
                console.log(squares[i])
                squares[i].className = 'elem square_default'
            }
            for (let j = 4; j <=15; j++) {
                console.log(squares[j])
                squares[j].className = 'elem square_default disabled'
            }
        } else {
            alert('Нажмите правой кнопкой мыши для того что бы вызвать контекстное меню!')
        }
    }
}