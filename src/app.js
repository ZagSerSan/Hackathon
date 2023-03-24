import './styles.css'

import {ContextMenu} from './menu'
 
const contextMenu = new ContextMenu();
contextMenu.open();
contextMenu.close();

const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
  item.addEventListener('click', event => {
    console.log(item.textContent);
  })
})