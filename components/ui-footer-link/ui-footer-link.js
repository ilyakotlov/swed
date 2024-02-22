const componentName = 'ui-footer-link';

class UiFooterLink extends HTMLElement {
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

customElements.define(componentName, UiFooterLink);