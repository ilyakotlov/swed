const componentName = 'sb-calculator';

export class Calculator extends HTMLElement {
  helper = new Helper();

  constructor() {
    super();
  }

  connectedCallback() {
    const self = this;
    (async () => {
      this.innerHTML = eval('`' + await this.helper.parseComponentVisuals(componentName) + '`');

      self.calculatePayment();

      document.addEventListener('input', function () {
        self.calculatePayment();
      }, false);
    })()
  }

  calculatePayment() {
    const loan = document.querySelector('.slider-loan').value;
    const period = document.querySelector('.dropdown-period option:checked').value;
    const interest = document.querySelector('.dropdown-interest option:checked').value;

    
    document.querySelector('.calculator-result-value').innerHTML = ((loan / (period * 12)) + (loan * ((interest / 100) / 12))).toFixed(2);
  }
}
customElements.define(componentName, Calculator);