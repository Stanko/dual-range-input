# Native Dual-range Input

The native part is somewhat open for discussion - the library uses two native range inputs
and about [fifty lines of JavaScript](https://cdn.jsdelivr.net/npm/@stanko/dual-range-input/dist/index.js) to make them work together.
In my book, it is _native enough_.

If you are interested in how it works, please check the [blog post](https://muffinman.io/blog/native-dual-range-input).

React version is coming soon.

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
@stanko/dual-range-input/dist/index.css;
```

Instantiate the library:

```js
import DualRangeInput from '@stanko/dual-range-input';

const $min = document.querySelector('#min');
const $max = document.querySelector('#max');

new DualRangeInput($min, $max);

// Add native event handlers
```

## Styling

Styles are controlled using CSS variables.

Here are all of the variables and their default values:

```css
.dual-range-input {
  --dri-thumb-width: 1.25rem;
  --dri-thumb-height: 1.25rem;

  --dri-thumb-color: #ddd;
  --dri-thumb-hover-color: #a8d5ff;
  --dri-thumb-active-color: #4eaaff;
  --dri-thumb-border-color: rgba(0, 0, 0, 0.1);
  --dri-thumb-border-radius: 1rem;

  --dri-track-height: 0.25rem;
  --dri-track-color: #ccc;
  --dri-track-filled-color: #0084ff;
  --dri-track-border-radius: 1rem;

  --dri-height: 1.5rem;
}
```

Please note that `--dri-thumb-width` is used in JavaScript for calculations.

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

- The only available public method is `destroy()` which removes event listeners set by the library.

```js
const priceInput = new DualRangeInput($min, $max);

priceInput.destroy();
```

## TODO

- [x] Remove highlight on tap, on mobile
- [x] Update readme
- [x] Publish the package
- [x] RTL
- [x] Write a blog post
- [ ] Add (p)react version

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
