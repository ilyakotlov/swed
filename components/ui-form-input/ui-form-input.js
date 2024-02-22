const componentName = 'ui-form-input';

class UiFormInput extends HTMLElement {
  helper = new Helper();
  static formAssociated = true;

  constructor() {
    super();

    this.invalid = false;
    this.pristine = true;
    this.internals = this.attachInternals();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
        .${componentName} input {
          border: 1px solid #BCD8DB;
          border-radius: 2px;
          height: 32px;
          font-size: 12px;
          color: #512B2B;
          padding: 0;
          box-sizing: border-box;
          padding: 0 10px !important;
          width: 100%;
        }
        .${componentName} .error-message {
          color: #C5131C;
          font-size: 12px;
          padding-left: 10px;
          margin-top: 3px;
        }

        .${componentName} input.invalid {
          border-color: #C5131C;
        }
      </style>
      <div class="${componentName}">
        <input type="text" id="${this.id}" />
        <div class="error-message"></div>
      </div>
    `;
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');
    [
      'type',
      'value',
      'placeholder',
      'required',
      'min',
      'max',
      'minLength',
      'maxLength',
      'pattern'
    ].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.input[attr] = attrValue;
      }
    });

    this.input.addEventListener('change', (e) => {
      if (this.validateOnChange) {
        this.pristine = false;
      }

      const clone = new e.constructor(e.type, e);
      this.dispatchEvent(clone);

      this.validateInput();
    });

    this.addEventListener('invalid', (e) => {
      this.invalid = true;
      this.pristine = false;

      if (this.customErrorDisplay) {
        e.preventDefault();
      }
    });

    this.addEventListener('focus', () => this.input.focus());

    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }

    this.validateInput();

    const form = document.querySelector('form');
    const input = document.querySelector(componentName);
    const errorMessage = this.shadowRoot.querySelector('.error-message');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    });

    input.addEventListener('invalid', (e) => {
      errorMessage.textContent = input.validationMessage;
      this.shadowRoot.querySelector('input').classList.add('invalid');
    });
    
    input.addEventListener('valid', (e) => {
      errorMessage.textContent = '';
      this.shadowRoot.querySelector('input').classList.remove('invalid');
    });
  }

  get customErrorDisplay() {
    return this.hasAttribute('custom-error-display');
  }

  get validateOnChange() {
    return this.hasAttribute('validate-on-change');
  }

  get invalid() {
    return this.hasAttribute('invalid');
  }

  set invalid(isInvalid) {
    isInvalid && this.customErrorDisplay ? this.setAttribute('invalid', '') : this.removeAttribute('invalid');
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.internals.setFormValue(value);
  }

  get form() {
    return this.internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }
  get validity() {
    return this.internals.validity;
  }

  get validationMessage() {
    return this.internals.validationMessage;
  }
  get willValidate() {
    return this.internals.willValidate;
  }
  checkValidity() {
    return this.internals.checkValidity();
  }
  reportValidity() {
    return this.internals.reportValidity();
  }

  validateInput() {
    const validState = this.input.validity;
    this.invalid = false;

    if (!validState.valid) {
      for (let state in validState) {
        const attr = `data-${state.toString()}`;

        if (validState[state]) {
          this.validationError = state.toString();
          this.invalid = !this.pristine && !validState.valid;
          const errorMessage = this.hasAttribute(attr) ?
            this.getAttribute(attr) : this.input.validationMessage;
          this.internals.setValidity(
            { [this.validationError]: true },
            errorMessage
          );

          if (this.invalid && this.customErrorDisplay) {
            this.dispatchEvent(new Event('invalid'));
          }
        }
      }
    }
    else {
      this.internals.setValidity({});
    }
  }
}

customElements.define(componentName, UiFormInput)