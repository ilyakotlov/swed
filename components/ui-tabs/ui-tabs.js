const componentName = 'ui-tabs';

class UiTabs extends HTMLElement {
  helper = new Helper();

  constructor() {
    super();

    const self = this;
    this._tabs = Array.from(this.querySelectorAll("[slot=tab]"));
    
    this._tabs.forEach((tab, index) => {
      tab.addEventListener('click', function () {
        self.selectTab(index);
      })
    });

    this._panels = Array.from(this.querySelectorAll("[slot=panel]"));
    this.selectTab(0);
  }
  
  connectedCallback() {
    this.shadow = this.attachShadow({ mode: "open" });

    (async () => {
      this.shadow.innerHTML = eval('`' + await this.helper.parseComponentVisuals(componentName) + '`');
    })()
  }
  
  selectTab(tabIndex) {
    this._tabs.forEach((tab) => tab.removeAttribute("selected"));
    this._tabs[tabIndex].setAttribute("selected", "");
    this._panels.forEach((panel) => panel.removeAttribute("selected"));
    this._panels[tabIndex].setAttribute("selected", "");
  }

  handleSelect(e) {
    const index = this._tabs.indexOf(e.target);
    this.selectTab(index);
  }
}

customElements.define("ui-tabs", UiTabs);