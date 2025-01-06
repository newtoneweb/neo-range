class NeoRange {
  constructor(selector, options = {}) {
    this.element = document.querySelector(selector);
    if (!this.element) {
      throw new Error(`Element with selector "${selector}" not found`);
    }
    const defaultOptions = {
        // input values
        min: -50,
        max: 100,
        step: 5,
        min_value: -5,
        max_value: 70,
        // scale settings
        use_scale_steps: true,
        scale_steps: 50,
        scale_segments: 5,
        // slider settings
        use_tooltip: true,
        prefix: "",
        suffix: "°C",
        // color settings
        color_primary: "#00cc99",
        track_color: "rgb(0 255 187 / 0.4)",
        tooltip_bg_color: "rgb(0 255 187 / 0.2)",
        // size settings
        marker_size: "15px",
        track_height: "2px",
    };

    // Using Object destructuring
    this.options = { ...defaultOptions, ...options };
   
    this.init();
  }

  init() {
    this.setupCSSVariables();
    this.createElements();
    this.setupInitialState();
    this.addEventListeners();
  }

  setupCSSVariables() {
    const { marker_size, track_height, tooltip_bg_color, color_primary } = this.options;
    Object.entries({
      "--color_primary": color_primary,
      "--marker-size": marker_size,
      "--track-height": track_height,
      "--tooltip-bg-color": tooltip_bg_color,
    }).forEach(([key, value]) => this.element.style.setProperty(key, value));
  }

  setupInitialState() {
    this.updateSliderFill();
    if (this.options.use_tooltip) {
      this.updateTooltip(this.fromSlider, this.fromTooltip);
      this.updateTooltip(this.toSlider, this.toTooltip);
    }
  }

  createElements() {
    const { min_value, max_value, use_tooltip, use_scale_steps } = this.options;
    this.slidersControl = this.createElement("div", "sliders_control");

    this.fromSlider = this.createSlider(min_value);
    this.toSlider = this.createSlider(max_value);
    this.fromTooltip = this.createTooltip(min_value);
    this.toTooltip = this.createTooltip(max_value);
    this.slidersControl.append(this.fromSlider, this.toSlider);

    if (use_tooltip) {
      this.slidersControl.append(this.fromTooltip, this.toTooltip);
    }
    this.element.appendChild(this.slidersControl);
    if (use_scale_steps) this.createScale();
  }

  createSlider(value) {
    const slider = this.createElement("input", null, null, {
      type: "range",
      min: this.options.min,
      max: this.options.max,
      step: this.options.step,
      value: value,
    });
    if (value === this.options.min_value) {
      slider.id = "fromSlider";
    }
    return slider;
  }

  createTooltip(value) {
    const { prefix, suffix } = this.options;
    return this.createElement(
      "div",
      "slider-tooltip",
      `${prefix}${value}${suffix}`
    );
  }

  createScale() {
    const { min, max, scale_steps, scale_segments, prefix, suffix } =
      this.options;
    const stepCount = (max - min) / scale_steps;
    const stepValue = (max - min) / stepCount;
    const segmentCount = (max - min) / scale_segments;
    const segmentValue = (max - min) / segmentCount;

    this.scale = this.createElement("div", "scale");
    this.element.appendChild(this.scale);
    // Add main scale markers with values
    for (let i = 0; i <= stepCount; i++) {
      const value = min + i * stepValue;
      const percent = ((value - min) / (max - min)) * 100;
      const marker = this.createElement(
        "div",
        "scale-marker",
        `${prefix}${value}${suffix}`
      );
      marker.style.left = `${percent}%`;
      this.scale.appendChild(marker);
    }
    // Add segment markers between main scale markers
    if (scale_steps / scale_segments < 25) {
      // dont create more than 10 segments
      for (let i = 0; i <= segmentCount; i++) {
        const value = min + i * segmentValue;
        const percent = ((value - min) / (max - min)) * 100;
        // Skip if this position already has a main marker
        if (i % (segmentCount / stepCount) !== 0) {
          const segment = this.createElement("div", "scale-marker-segment");
          segment.style.left = `${percent}%`;
          this.scale.appendChild(segment);
        }
      }
    } else {
      console.log(
        "Too many segments. Please reduce the scale_segments value."
      );
    }
  }

  createElement(tag, className = "", textContent = "", attributes = {}) {
    return Object.assign(
      document.createElement(tag),
      className ? { className } : {},
      textContent ? { textContent } : {},
      attributes
    );
  }

  updateSliderFill() {
    const { min, max, track_color, color_primary } = this.options;
    const fromPosition = (this.fromSlider.value - min) / (max - min);
    const toPosition = (this.toSlider.value - min) / (max - min);

    
    const gradient = `linear-gradient(to right, 
        ${track_color} 0%, 
        ${track_color} ${fromPosition * 100}%, 
        ${color_primary} ${fromPosition * 100}% ${toPosition * 100}%, 
        ${track_color} ${toPosition * 100}%, 
        ${track_color} 100%)`;
        
    this.slidersControl.style.background = gradient;
  }

  updateTooltip(slider, tooltip) {
    const { prefix, suffix, min, max } = this.options;
    const value = slider.value;
    tooltip.textContent = `${prefix}${value}${suffix}`;
    const percent = ((value - min) / (max - min)) * 100;
    tooltip.style.left = `${percent}%`;
  }

  addEventListeners() {
    const handleInput = (slider, tooltip, isFrom) => {
      const from = parseInt(this.fromSlider.value);
      const to = parseInt(this.toSlider.value);
      if (isFrom && from > to) slider.value = to;
      if (!isFrom && to < from) slider.value = from;
      this.updateSliderFill();
      if (this.options.use_tooltip) this.updateTooltip(slider, tooltip);
    };

    this.fromSlider.addEventListener("input", () =>
      handleInput(this.fromSlider, this.fromTooltip, true)
    );

    this.toSlider.addEventListener("input", () =>
      handleInput(this.toSlider, this.toTooltip, false)
    );

    if (this.options.use_tooltip) {
      this.fromTooltip.addEventListener("mousedown", (e) =>
        this.startDragging(e, this.fromSlider)
      );
      this.toTooltip.addEventListener("mousedown", (e) =>
        this.startDragging(e, this.toSlider)
      );
      document.addEventListener("mousemove", this.handleDrag.bind(this));
      document.addEventListener("mouseup", this.stopDragging.bind(this));
    }
  }

  handleSliderInput(slider, tooltip, isFrom) {
    const from = parseInt(this.fromSlider.value);
    const to = parseInt(this.toSlider.value);
    if (isFrom && from > to) slider.value = to;
    if (!isFrom && to < from) slider.value = from;
    this.updateSliderFill();
    if (tooltip) this.updateTooltip(slider, tooltip);
  }

  handleDrag(e) {
    if (!this.isDragging) return;

    const range = this.options.max - this.options.min;
    const sliderWidth = this.element.offsetWidth;
    const valueChange = ((e.clientX - this.startX) / sliderWidth) * range;
    let newValue = Math.max(
      this.options.min,
      Math.min(this.options.max, this.startValue + Math.round(valueChange))
    );
    newValue = Math.round(newValue / this.options.step) * this.options.step;
    this.currentSlider.value = newValue;
    const tooltip =
      this.currentSlider === this.fromSlider
        ? this.fromTooltip
        : this.toTooltip;
    this.handleSliderInput(
      this.currentSlider,
      tooltip,
      this.currentSlider === this.fromSlider
    );
  }
  startDragging(e, slider) {
    this.isDragging = true;
    this.currentSlider = slider;
    this.startX = e.clientX;
    this.startValue = parseInt(slider.value);
  }
  stopDragging() {
    this.isDragging = false;
    this.currentSlider = null;
  }
  getRange() {
    return {
      from: parseInt(this.fromSlider.value),
      to: parseInt(this.toSlider.value),
    };
  }
}
