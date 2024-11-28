// WIP

import React, { useRef, useEffect, useState, SyntheticEvent } from 'react';

export type DualRangeValues = [minValue: number, maxValue: number];

type DualRangeInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  children?: React.ReactNode;
  className?: string;
  min: number;
  max: number;
  step?: number;
  onInput?: (
    e: React.ChangeEvent<HTMLInputElement>,
    values: DualRangeValues
  ) => void;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>,
    values: DualRangeValues
  ) => void;
  values: [minValue: number, maxValue: number];
  precision?: number;
};

const getMid = (
  min: number,
  max: number,
  step: number,
  method: 'ceil' | 'floor' = 'ceil'
) => {
  const midValue = (max - min) / 2;

  return min + Math[method](midValue / step) * step;
};

/**
 * @remarks
 * The component requires the CSS variable --dri-thumb-width to be set for proper thumb positioning.
 */
const DualRangeInput: React.FC<DualRangeInputProps> = ({
  children,
  className = '',
  min,
  max,
  step = 1,
  values,
  onInput,
  onChange,
  onFocus,
  precision = 3,
  ...props
}) => {
  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);
  const [mid, setMid] = useState<number>(getMid(min, max, step));
  const [minStyle, setMinStyle] = useState<Record<string, string>>({});
  const [maxStyle, setMaxStyle] = useState<Record<string, string>>({});

  const update = (newValues = values, method: 'floor' | 'ceil' = 'ceil') => {
    if (!minInputRef.current || !maxInputRef.current) {
      return;
    }

    const [minValue, maxValue] = newValues;

    const mid = getMid(min, max, step, method);

    const range = max - min;

    // Thumb width has to be set through the CSS --dri-thumb-width variable
    const thumbWidthVariable = getComputedStyle(
      minInputRef.current
    ).getPropertyValue('--dri-thumb-width');

    const thumbWidth = parseFloat(thumbWidthVariable);
    const thumbWidthUnit = thumbWidthVariable.replace(/^[\d\.]+/, ''); // px, em, rem...

    const leftWidth = ((mid - min) / range) * 100;
    const rightWidth = ((max - mid) / range) * 100;

    const minFill = (minValue - min) / (mid - min) || 0;
    const maxFill = (maxValue - mid) / (max - mid) || 0;

    const minFillThumb = (0.5 - minFill) * thumbWidth;
    const maxFillThumb = (0.5 - maxFill) * thumbWidth;

    setMid(mid);

    setMinStyle({
      '--dri-gradient-position': `calc(${
        minFill * 100
      }% + ${minFillThumb}${thumbWidthUnit})`,
      flexBasis: `calc(${leftWidth}% + ${thumbWidthVariable})`,
    });

    setMaxStyle({
      '--dri-gradient-position': `calc(${
        maxFill * 100
      }% + ${maxFillThumb}${thumbWidthUnit})`,
      flexBasis: `calc(${rightWidth}% + ${thumbWidthVariable})`,
    });
  };

  const onInputMin = (e) => {
    const newValues: DualRangeValues = [parseFloat(e.target.value), values[1]];

    if (onInput) {
      onInput(e, newValues);
    }
    update(newValues, 'ceil');
  };

  const onInputMax = (e) => {
    const newValues: DualRangeValues = [values[0], parseFloat(e.target.value)];
    if (onInput) {
      onInput(e, newValues);
    }
    update(newValues, 'floor');
  };

  const onFocusMin = (e) => {
    if (onFocus) {
      onFocus(e);
    }

    update(values, 'ceil');
  };

  const onFocusMax = (e) => {
    if (onFocus) {
      onFocus(e);
    }

    update(values, 'floor');
  };

  useEffect(() => {
    update();

    if (minInputRef.current && maxInputRef.current) {
      minInputRef.current.dataset.ready = 'true';
      maxInputRef.current.dataset.ready = 'true';
    }
  }, []);

  const onChangeHandler = (e) => {
    if (onChange && minInputRef.current && maxInputRef.current) {
      const newValues: DualRangeValues = [
        parseFloat(minInputRef.current.value),
        parseFloat(maxInputRef.current.value),
      ];

      onChange(e, newValues);
    }
  };

  return (
    <div className={`dual-range-input ${className}`}>
      <input
        {...props}
        onChange={onChangeHandler}
        onInput={onInputMin}
        onFocus={onFocusMin}
        type="range"
        min={min}
        max={mid.toFixed(precision)}
        step={step}
        value={values[0]}
        ref={minInputRef}
        style={minStyle}
      />
      <input
        {...props}
        onChange={onChangeHandler}
        onInput={onInputMax}
        onFocus={onFocusMax}
        type="range"
        min={mid.toFixed(precision)}
        max={max}
        step={step}
        value={values[1]}
        ref={maxInputRef}
        style={maxStyle}
      />
      {children}
    </div>
  );
};

export default DualRangeInput;
