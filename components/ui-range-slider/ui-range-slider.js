const componentName = 'ui-range-slider';

class UiRangeSlider extends HTMLElement {
  helper = new Helper();

  constructor() {
    super();

    this.value = parseFloat(this.getAttribute("value")) || 0;
    this.min = parseFloat(this.getAttribute("min")) || 0;
    this.max = parseFloat(this.getAttribute("max")) || 100;
    this.step = parseFloat(this.getAttribute("step")) || 1;

    this.style.minWidth = "12rem";
    this.style.minHeight = "1rem";
    this.style.position = "relative";

    // Slider Element
    this.shadow = this.attachShadow({ mode: "open" });

    // Functionality
    this.dragging = false;

    this.create();
    this.update();
  }

  create() {
    let slider = document.createElement("input");
    let sliderContainer = document.createElement("div");
    let sliderTrack = document.createElement("div");
    let value = document.createElement("div");
    let infoContainer = document.createElement("div");
    let minValue = document.createElement("span");
    let maxValue = document.createElement("span");

    let style = document.createElement("style");

    (async () => {
      style.innerHTML = eval('`' + await this.helper.parseComponentVisuals(componentName) + '`');
      this.shadow.appendChild(style);
    })()

    slider.type = "range";
    slider.id = "slider";
    slider.min = this.min;
    slider.max = this.max;
    slider.step = this.step;
    slider.value = this.value;

    sliderContainer.id = "slider-container";
    sliderTrack.id = "slider-track";
    value.id = "value";

    infoContainer.className = 'slider-info-container';

    minValue.className = 'slider-min-value';
    minValue.innerText = slider.min + ' €';

    maxValue.className = 'slider-max-value';
    maxValue.innerText = slider.max + ' €';

    slider.addEventListener("input", this.update.bind(this));

    sliderContainer.appendChild(slider);
    sliderContainer.appendChild(value);
    sliderContainer.appendChild(sliderTrack);
    sliderContainer.appendChild(infoContainer);
    infoContainer.appendChild(minValue);
    infoContainer.appendChild(maxValue);
    this.shadow.appendChild(sliderContainer);
  }

  update() {
    let track = this.shadow.getElementById("slider-container");
    let slider = this.shadow.getElementById("slider");
    let value = this.shadow.getElementById("value");
    let valuePercentage = slider.value / (this.max - this.min);
    
    document.querySelector('.slider-loan').value = slider.value;
    value.innerText = slider.value + ' €';
    track.style.setProperty("--value", valuePercentage);
  }
}

customElements.define(componentName, UiRangeSlider);

