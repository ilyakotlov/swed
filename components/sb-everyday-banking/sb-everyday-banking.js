const componentName = 'sb-everyday-banking';

export class EverydayBanking extends HTMLElement {
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
customElements.define(componentName, EverydayBanking);