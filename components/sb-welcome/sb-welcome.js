const componentName = 'sb-welcome';

export class Welcome extends HTMLElement {
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
customElements.define(componentName, Welcome);