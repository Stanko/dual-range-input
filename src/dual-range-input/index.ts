class DualRangeInput {
  $min: HTMLInputElement;
  $max: HTMLInputElement;

  constructor($min: HTMLInputElement, $max: HTMLInputElement) {
    this.$min = $min;
    this.$max = $max;

    this.$min.addEventListener('input', this.updateCeil);
    this.$max.addEventListener('input', this.updateFloor);

    this.$min.addEventListener('focus', this.updateCeil);
    this.$max.addEventListener('focus', this.updateFloor);

    this.update();

    this.$min.dataset.ready = 'true';
    this.$max.dataset.ready = 'true';
  }

  updateFloor = () => this.update('floor');

  updateCeil = () => this.update('ceil');

  update(method: 'floor' | 'ceil' = 'floor') {
    const min = parseFloat(this.$min.min);
    const max = parseFloat(this.$max.max);
    const step = parseFloat(this.$min.step);
    const minValue = parseFloat(this.$min.value);
    const maxValue = parseFloat(this.$max.value);

    const midValue = (maxValue - minValue) / 2;
    const mid = minValue + Math[method](midValue / step) * step;

    const range = max - min;

    // Thumb width has to be set through the CSS --dri-thumb-width variable
    const thumbWidthVariable = getComputedStyle(this.$min).getPropertyValue(
      '--dri-thumb-width'
    );

    const thumbWidth = parseFloat(thumbWidthVariable);
    const thumbWidthUnit = thumbWidthVariable.replace(/^[\d\.]+/, ''); // px, em, rem...

    const leftWidth = ((mid - min) / range) * 100;
    const rightWidth = ((max - mid) / range) * 100;

    this.$min.style.flexBasis = `calc(${leftWidth}% + ${thumbWidthVariable})`;
    this.$max.style.flexBasis = `calc(${rightWidth}% + ${thumbWidthVariable})`;

    this.$min.max = mid.toFixed(3);
    this.$max.min = mid.toFixed(3);

    const minFill = (minValue - min) / (mid - min) || 0;
    const maxFill = (maxValue - mid) / (max - mid) || 0;

    const minFillThumb = (0.5 - minFill) * thumbWidth;
    const maxFillThumb = (0.5 - maxFill) * thumbWidth;

    this.$min.style.setProperty(
      '--dri-gradient-position',
      `calc(${minFill * 100}% + ${minFillThumb}${thumbWidthUnit})`
    );
    this.$max.style.setProperty(
      '--dri-gradient-position',
      `calc(${maxFill * 100}% + ${maxFillThumb}${thumbWidthUnit})`
    );
  }

  destroy() {
    this.$min.removeEventListener('input', this.updateFloor);
    this.$max.removeEventListener('input', this.updateCeil);

    this.$min.removeEventListener('focus', this.updateFloor);
    this.$max.removeEventListener('focus', this.updateCeil);
  }
}

export default DualRangeInput;
