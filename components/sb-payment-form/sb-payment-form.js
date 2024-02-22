const componentName = 'sb-payment-form';

export class PaymentForm extends HTMLElement {
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
customElements.define(componentName, PaymentForm);