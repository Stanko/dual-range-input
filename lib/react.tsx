import React, { useRef, useEffect } from 'react';
import DualRangeInputClass from '.';

export type DualRangeValues = [minValue: number, maxValue: number];

type RangeInput = React.ReactElement<HTMLInputElement & { type: 'range' }>;

type DualRangeInputProps = React.HTMLProps<HTMLDivElement> & {
  /** Component expects two HTML range inputs as children */
  children: [min: RangeInput, max: RangeInput];
  className?: string;
  /** Thumb width in CSS units. It must be the same as the `--dri-thumb-width` CSS variable. If it is not passed, the library will try to read it from the CSS variable. However, there is a weird edge case in Safari where JavaScript seems to be executed before CSS is applied. If you encounter this issue, you'll have to pass the value manually. */
  thumbWidth?: string;
  /**  The number of decimal places to round the mid value to, defaults to 3 */
  precision?: number;
};

const DualRangeInput: React.FC<DualRangeInputProps> = ({
  children,
  className = '',
  thumbWidth = '',
  precision = 3,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<DualRangeInputClass>(null);

  useEffect(() => {
    if (wrapperRef.current) {
      if (
        children[0].type === 'input' &&
        children[0].props.type === 'range' &&
        children[1].type === 'input' &&
        children[1].props.type === 'range'
      ) {
        const $min = wrapperRef.current.querySelector(
          'input:nth-child(1)'
        ) as HTMLInputElement;
        const $max = wrapperRef.current.querySelector(
          'input:nth-child(2)'
        ) as HTMLInputElement;

        instanceRef.current = new DualRangeInputClass(
          $min,
          $max,
          thumbWidth,
          precision
        );
      } else {
        console.error('DualRangeInput expects two range inputs as children');
      }
    }

    return () => {
      instanceRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.thumbWidthVariable = thumbWidth;
    }
  }, [thumbWidth]);

  return (
    <div
      {...props}
      className={`dual-range-input ${className}`}
      ref={wrapperRef}
    >
      {children}
    </div>
  );
};

export default DualRangeInput;
