import './styles.css'
import {ContextMenu} from './menu'
import {BackgroundModule} from './modules/background.module'
import {ClicksModule} from './modules/clicks.module'
import {ShapeModule} from './modules/shape.module'
import {TestModule} from './modules/test.module'
import {Castommessage} from './modules/castommessage.module'


const contextMenu = new ContextMenu();

const backgroundModule = new BackgroundModule();
const clicksModule = new ClicksModule();
const shapeModule = new ShapeModule();
const testModule = new TestModule();
const castommessage = new Castommessage();

// вызов меню
contextMenu.open();
contextMenu.close();

// add() может принимать модули по одному и массивом несколько сразу
contextMenu.add([backgroundModule, clicksModule, shapeModule,]);
contextMenu.add(testModule);
contextMenu.add(castommessage);

// слушатель клика по айтемам меню
contextMenu.menuItemListener();

