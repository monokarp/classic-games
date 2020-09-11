
/* eslint-disable class-methods-use-this */
export class Navbar {
  constructor(hostElementId) {
    this.host = document.getElementById(hostElementId);
  }

  init(tabsConfig) {
    tabsConfig.forEach(tab => {
      this.host.appendChild(
        this.createNavbarTab(tab)
      );
    });
  }

  onSelect() {
    return null;
  }

  createNavbarTab(tab) {
    const element = document.createElement('div');

    element.setAttribute('id', tab.id);

    element.innerText = tab.text;

    return element;
  }
}
