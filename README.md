# gl-react-blurhash ![](https://img.shields.io/npm/v/gl-react-blurhash.svg) [![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)

Universal [`gl-react`](https://github.com/gre/gl-react) module that implements [BlurHash](https://github.com/woltapp/blurhash) in OpenGL.

## Installation

### Expo

Add the following dependencies:

```sh
expo add gl-react gl-react-expo expo-gl buffer gl-react-blurhash
```

### React Native

First setup [`react-native-unimodules`](https://docs.expo.io/bare/installing-unimodules/), then add the following dependencies:

```sh
yarn add gl-react gl-react-native buffer gl-react-blurhash
```

## Usage

```js
import React from 'react';
import { Surface } from 'gl-react-expo'; // 'gl-react-native' for React Native
import { Blurhash } from 'gl-react-blurhash';

export default function App {
    return (
        <Surface style={{ width: 300, height: 200 }}>
            <Blurhash hash="LPKA$w{H_c05b{Nqwbx^grotMnNf" />
        </Surface>
    );
}
```

## Example

See [`example`](example) subfolder for a full example.
This example is also available on [snack.expo.io](https://snack.expo.io/@git/github.com/schiller-manuel/gl-react-blurhash:example@develop).
