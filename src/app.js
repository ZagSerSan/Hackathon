import './styles.css'
import {ContextMenu} from './menu'
import {BackgroundModule} from './modules/background.module'
import CustomModule from "./modules/custom.module";

// вызов меню
const contextMenu = new ContextMenu();
contextMenu.open();
contextMenu.close();

// слушатель нажатия на айтемы меню
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', event => {
    if (item.dataset.role == 'analytics') {
      console.log('Здесь выполняется код модуля "Аналитика кликов"');
    } else if (item.dataset.role == 'figure') {
      console.log('Здесь выполняется код модуля "Случайная фигура"');
    } else if (item.dataset.role == 'timer') {
      console.log('Здесь выполняется код модуля "Таймер отсчета"');
    } else if (item.dataset.role == 'sound') {
      console.log('Здесь выполняется код модуля "Случайный звук"');
    } else if (item.dataset.role == 'background') {
      console.log('Здесь выполняется код модуля "Случайный фон"');
    } else if (item.dataset.role == 'message') {
      console.log('Здесь выполняется код модуля "Кастомное сообщение"');
    } else if (item.dataset.role == 'custom') {
      const custom = new CustomModule('custom', 'Кастомный модуль')
      custom.trigger()
    }
  })
})