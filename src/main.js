import { Navbar } from './navbar/navbar';
import { setupApp } from './app/setup';

const viewTabs = [
  { id: 'minesweeper', text: 'Minesweeper' },
  { id: 'minesweeper', text: 'Placeholder' }
];

const navbar = new Navbar('navbarHost');

navbar.init(viewTabs);

setupApp('minesweeper', 'appHost');
