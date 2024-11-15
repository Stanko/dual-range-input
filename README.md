# Native Dual Range Input

**Readme is still work in progress.**

The native part is somewhat open for discussion.
But the implementation uses two native range inputs
and about eighty lines of TypeScript to make them work together.
In my book, it is _native enough_.

## Usage

Required markup:

```html
<div class="dual-range-input">
  <input type="range" min="0" max="100" step="1" value="25" id="min" />
  <input type="range" min="0" max="100" step="1" value="75" id="max" />
</div>
```

JavaScript:

```js
const $min = document.querySelector('#min');
const $max = document.querySelector('#max');

new DualRangeInput($min, $max);
```

### Styling

Styles are controlled using CSS variables.

Here are all of the variables and their default values:

```css
.dual-range-input {
  --dri-thumb-width: 1rem;
  --dri-thumb-height: 1rem;

  --dri-thumb-color: #ddd;
  --dri-thumb-active-color: rgb(78, 170, 255);
  --dri-thumb-hover-color: rgb(168, 213, 255);
  --dri-thumb-border-color: rgba(0, 0, 0, 0.1);

  --dri-track-height: 0.25rem;
  --dri-track-color: #ccc;
  --dri-track-filled-color: rgb(0, 132, 255);
  --dri-track-border-radius: 1rem;

  --dri-thumb-border-radius: 1rem;
  --dri-height: 1.5rem;
}
```
