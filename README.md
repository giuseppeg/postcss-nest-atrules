# PostCSS Nest Atrules [![Build Status][ci-img]][ci]

[PostCSS] plugin to nest atrules inside their rules (inverse of unwarpping).

The main reason why I made this plugin is that it makes it easy to then convert CSS to CSS-in-JS.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/giuseppeg/postcss-nest-atrules.svg
[ci]:      https://travis-ci.org/giuseppeg/postcss-nest-atrules

```css
.root {
  color: red;
}
@media screen and (min-width: 5em) {
  .root {
     color: green;
  }
}
```

```css
.root {
  color: red;

  @media screen and (min-width: 5em) {
    color: green;
  }
}
```

## Usage

```js
postcss([ require('postcss-nest-atrules') ])
```

See [PostCSS] docs for examples for your environment.
