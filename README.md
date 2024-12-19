# Native Dual-range Input

The native part is somewhat open for discussion - the library uses two native range inputs
and about [sixty lines of JavaScript](https://cdn.jsdelivr.net/npm/@stanko/dual-range-input/dist/index.js) to make them work together.
In my book, it is _native enough_.

If you are interested in how it works, please check the [blog post](https://muffinman.io/blog/native-dual-range-input).

## Usage

Install it:

```bash
npm install @stanko/dual-range-input
```

Add the required markup:

```html
<div class="dual-range-input">
  <input type="range" min="0" max="100" step="1" value="25" id="min" />
  <input type="range" min="0" max="100" step="1" value="75" id="max" />
</div>
```

Import the CSS file located at:

```
./node_modules/@stanko/dual-range-input/dist/index.css
```

Instantiate the library:

```js
import DualRangeInput from '@stanko/dual-range-input';

const $min = document.querySelector('#min');
const $max = document.querySelector('#max');

new DualRangeInput($min, $max);

// Add native event handlers
$min.addEventListener('input', () => {
  // ...
});
```

### Parameters

- **$min** `HTMLInputElement` - The range input element for the minimum value
- **$max** `HTMLInputElement` - The range input element for the maximum value
- **precision** `number`, optional, defaults to 3 - The number of decimal places to round the mid value to

## Styling

Styles are controlled using CSS variables.

Here are all of the variables and their default values:

```css
/* Height of the input */
--dri-height: 1.5rem;

/* Thumb size */
--dri-thumb-width: 1.25rem;
--dri-thumb-height: 1.25rem;

/* Thumb background color */
--dri-thumb-color: #ddd;
--dri-thumb-hover-color: #a8d5ff;
--dri-thumb-active-color: #4eaaff;

/* Thumb border */
--dri-thumb-border-color: rgba(0, 0, 0, 0.1);
--dri-thumb-border-hover-color: var(--dri-thumb-border-color);
--dri-thumb-border-active-color: var(--dri-thumb-border-color);
--dri-thumb-border-radius: 1rem;
--dri-thumb-border-width: 1px;

/* Track size */
--dri-track-height: 0.25rem;
--dri-track-border-radius: 1rem;

/* Track color */
--dri-track-color: #ccc;
--dri-track-filled-color: #0084ff;
```

Please note that `--dri-thumb-width` is used by the library through the CSS `calc()` methods.

### Custom theme

To create your own theme, just change the variables. For example here is code for the purple example from the demo page:

```scss
.dual-range-input--purple {
  --dri-thumb-width: 2rem;
  --dri-thumb-height: 2rem;

  --dri-thumb-color: #ddd;
  --dri-thumb-active-color: #682af8;
  --dri-thumb-hover-color: #b697ff;

  --dri-track-filled-color: #682af8;

  --dri-height: 2rem;
}
```

This gives you:

![Dual range input styled in purple](./purple-example.png)

You can find more examples in the [demo SCSS file](./demo/index.scss).

### :focus-visible styles

These are the default focus styles, feel free to override them.

```scss
.dual-range-input:has(input:focus-visible) {
  outline: 2px solid var(--dri-thumb-active-color);
  outline-offset: 4px;
  border-radius: 4px;
}
```

## API

- `update(method: 'floor' | 'ceil' = 'ceil')`

  The main method that updates the mid-point and the gradient fill. You should call it only when you make direct changes to one of the input's value.

  `method` is the rounding method used for the mid-point. It is used only when the midpoint falls between two tickmarks. In the case of direct value changes, this doesn't matter much. However, the library uses `ceil` when the minimum input is updated and `floor` when the maximum input is updated.

  ```js
  const priceInput = new DualRangeInput($min, $max);

  $min.value = 20;
  priceInput.update('ceil');

  $max.value = 37;
  priceInput.update('floor');
  ```

- `destroy()`

  Removes event listeners set by the library.

  ```js
  const priceInput = new DualRangeInput($min, $max);

  priceInput.destroy();
  ```

## WebComponent

For now, for those who prefer WebComponents, here is a simple example:

```js
import DualRangeInput from '@stanko/dual-range-input';

class DualRangeInputWebComponent extends HTMLElement {
  constructor() {
    super();

    const $min = this.querySelector('input[type=range]:first-child');
    const $max = this.querySelector('input[type=range]:nth-child(2)');

    new DualRangeInput($min, $max);
  }
}

customElements.define('dual-range-input', DualRangeInputWebComponent);
```

## TODO

- [x] Remove highlight on tap, on mobile
- [x] Update readme
- [x] Publish the package
- [x] RTL
- [x] Write a blog post
- [ ] Add (p)react version
- [ ] Explore web component approach

## Other

- Library is only available as ESM module.
- Library doesn't include border around the track, it just feels too hacky. But here is the code if you want to use it:

  ```scss
  .dual-range-input {
    --dri-track-border-color: #ccc;
    position: relative;

    &::before {
      content: '';
      display: block;
      position: absolute;
      background-color: var(--dri-track-border-color);
      border-radius: var(--dri-track-border-radius);
      // Make it stick 1px on each side
      height: calc(var(--dri-track-height) + 2px);
      left: -1px;
      right: -1px;
      // Center it vertically
      top: 50%;
      transform: translateY(-50%);
    }

    input {
      // Put the inputs above it
      position: relative;
      z-index: 1;
    }
  }
  ```
