import {Module} from "@/core/module";

import './custom.css';
import {random} from "@/utils";


export default class CustomModule extends Module{
    #score
    #greatest

    constructor() {
        super('custom', 'Кубики');

        this.#score = 0
        this.#greatest = 0

    }

    get getGreatestScore() {
        return this.#greatest
    }

    set setGreatestScore(value) {
        this.#greatest = value
    }

    trigger() {

        // Проверяем на то что если человек нажмет 100000 раз на мой модуль ( что бы ререндера не было )
        if (document.querySelector('.custom_game')) {
            return
        }

        const body = document.body
        const container = document.createElement('div')
        const game = document.createElement('div')
        const title = document.createElement('h1')
        const scoreHTML = document.createElement('h2')
        const greatestScoreHTML = document.createElement('h2')

        game.className = 'custom_game'

        container.className = 'text-container'
        body.append(container)
        container.append(game)

        title.textContent = 'Кубики'
        title.className = 'title'

        scoreHTML.textContent = `Очки: `
        scoreHTML.className = 'score'

        greatestScoreHTML.textContent = `Наилучший результат : `
        greatestScoreHTML.className = 'score'

        game.append(title, scoreHTML, greatestScoreHTML)

        super.trigger();
        this.#initialize(game , scoreHTML, greatestScoreHTML)
    }

    //Инициализиаруме колонки и строчки
    #initialize(game, scoreHTML, greatestScoreHTML) {
        let id = 1

        for (let i = 0; i < 4; i++) {
            let col = document.createElement('div')
            col.className = 'col'
            col.id = `${id}`

            game.append(col)
            for (let j = 0; j < 4; j++) {
                let row = document.createElement('div')
                if (i === 0) {
                    row.className = 'elem square_default'
                } else  {
                    row.className = 'elem square_default disabled'
                }

                row.id = `${id}`

                row.addEventListener('click',(e)=> {
                    console.log('123')
                    const allSquares = document.querySelectorAll('.elem')
                    this.#getRate(row, allSquares, scoreHTML, greatestScoreHTML)
                })
                col.append(row)
                id++
            }
        }
    }

    // Основная логика
    #getRate(row, allSquares, scoreHTML, greatestScoreHTML) {
        const randomizer = random(1,10)

        if (randomizer <= 7) {
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
                if (randomizer <= 7) {
                    const result = confirm('Вы победили! Хотите начать сначала?')
                    this.#newGame(result)
                }
                for (let i = 12; i < 16; i++) {
                    allSquares[i].classList.add('disabled')
                }
            }
            this.#score++
            scoreHTML.textContent = `Очки: ${this.#score}`

            if (this.getGreatestScore < this.#score) {
                this.setGreatestScore = this.#score
                greatestScoreHTML.textContent = `Наилучший результат : ${this.getGreatestScore}`

            }

        } else {
            this.#score = 0
            scoreHTML.textContent = `Очки: ${this.#score}`

            row.classList.add('square_defeated')
            allSquares.forEach((item) => {
                item.classList.add('disabled')
            })

            const result = confirm('Повезет в следущий раз, хотите попробовтаь еще раз?')
            this.#newGame(result)
        }
    }

    // При успешном прохождении или поражении можно начать сначало
    #newGame(condition) {
        if (condition) {
           const squares = document.querySelectorAll('.elem')

            for (let i = 0; i <= 3; i++) {
                squares[i].className = 'elem square_default'
            }
            for (let j = 4; j <=15; j++) {
                squares[j].className = 'elem square_default disabled'
            }
        } else {
            alert('Нажмите правой кнопкой мыши для того что бы вызвать контекстное меню!')
        }
    }


    toHTML() {
        return `<li class="menu-item" data-type="${this.type}">${this.text}</li>`
    }
}