# dotify-react

> A library to give life to the background of your app

[![NPM](https://img.shields.io/npm/v/dotify-react.svg)](https://www.npmjs.com/package/dotify-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save dotify-react
```
or
```bash
yarn add dotify-react
```

## Usage

```tsx
import React, { Component } from 'react'

import DotifyReact from 'dotify-react'

class Example extends Component {
  render() {
    return <div>
      <DotifyReact dotsCount={100} />
      ...some content
    </div>
  }
}
```
On this case, dots background will have fixed position
```tsx
import React, { Component } from 'react'

import DotifyReact from 'dotify-react'

class Example extends Component {
  render() {
    return <div>
      <DotifyReact dotsCount={100}>
        ...some content
      </DotifyReact>
    </div>
  }
}
```
On this case, dots background will wrap all children

## Props
```tsx
<DotifyReact dotsCount={100} />
```
dotsCount: number

## License

MIT © [StepanSnigur](https://github.com/StepanSnigur)
