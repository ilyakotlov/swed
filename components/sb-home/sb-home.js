const componentName = 'sb-home';

export class Home extends HTMLElement {
  helper = new Helper();

  constructor() {
    super();
  }

  connectedCallback() {
    (async () => {
      this.innerHTML = eval('`' + await this.helper.parseComponentVisuals(componentName) + '`');
    })()
  }
}
customElements.define(componentName, Home);