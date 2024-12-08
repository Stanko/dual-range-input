# Changelog

## v0.9.10

08.12.2024.

### Fixed

- In Safari a race condition would happen when JavaScript was executed before CSS was loaded and CSS variables weren't available in JavaScript. Added a new property to allow users to pass thumb width variable manually.

## v0.9.9

05.12.2024.

### Fixed

- Safari doesn't trigger `focus` event on `mousedown` or `touchstart`. Added listeners for these events to fix the issue.
- Added web component example to the documentation.

## v0.9.8

28.11.2024.

### Fixed

- Added `precision` parameter to fix a problem with floating point number rounding.

## v0.9.0 - v0.9.7

17.11.2024.

Initial version, with small tweaks and documentation updates.
