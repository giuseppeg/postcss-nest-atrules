const postcss = require('postcss')

const plugin = require('./')

function run(input) {
  return postcss([plugin()])
    .process(input)
    .then(result => result.css)
}

it('leaves rules untouched', async () => {
  const css = await run(`
    .a {
      color: red;
    }
  `)

  expect(css).toMatchSnapshot()
})

it('simple', async () => {
  const css = await run(`
    .a { color: red; }
    @media (min-width: 5px) {
      .a { color: hotpink; }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('at-rule alone', async () => {
  const css = await run(`
    @media (min-width: 5px) {
      .a { color: hotpink; }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('nested at-rules', async () => {
  const css = await run(`
    .a { display: block }
    @media (min-width: 50px) {
      @support (display: flex) {
        .a { color: red; }
      }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('at-rules alone', async () => {
  const css = await run(`
    @media (min-width: 50px) {
      @support (display: flex) {
        .a { color: red; }
      }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('at-rules alone (inverse order)', async () => {
  const css = await run(`
    @support (display: flex) {
      @media (min-width: 50px) {
        .a { color: red; }
      }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('multiple rules', async () => {
  const css = await run(`
    .a { color: red; }
    @media (min-width: 5px) {
      .a { color: hotpink; }
      .b { color: green }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('compound selectors', async () => {
  const css = await run(`
    .a, .b { color: red; }
    @media (min-width: 5px) {
      .a { color: hotpink; }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('many occourences', async () => {
  const css = await run(`
    .a { color: red; }
    .a { color: orange; }
    .b { color: blue }

    @media (min-width: 3em) {
      .a {
        color: green
      }

      .b {
        color: yellow;
      }
    }
  `)

  expect(css).toMatchSnapshot()
})

it('big mess', async () => {
  const css = await run(`
    .a { color: red; }
    .a { color: orange; }
    .b { color: blue }

    @media (min-width: 3em) {
      .a {
        color: green
      }

      .b {
        color: yellow;
      }
    }

    .c, .d { color: red }

    @media (min-width: 50px) {
      .c { color: hotpink }
      .d { color: hotpink }
      @support (display: flex) {
      .a { color: red }
      }
      .a { color: red }
    }

    @support (display: flex) {
      @media (min-width: 50px) {
    .a { color: red }
      }
    }
  `)

  expect(css).toMatchSnapshot()
})
