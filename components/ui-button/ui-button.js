const componentName = 'ui-button';

class UiButton extends HTMLElement {
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

customElements.define(componentName, UiButton);