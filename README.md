# @ianwalter/exclude-assets-plugin
> A [html-webpack-plugin][hwpUrl] plugin to exclude certain assets from your
> HTML files

[![npm page][npmImage]][npmUrl]
[![CI][ciImage]][ciUrl]

## Installation

```console
yarn add @ianwalter/exclude-assets-plugin
```

## Usage

Here's an example of a stripped down Webpack configuration that excludes all
JavaScript assets from the generated HTML file:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExcludeAssetsPlugin = require('@ianwalter/exclude-assets-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/pageTemplate.html',
      minify: isProd,
      excludeAssets: [/\.js/]
    }),
    new ExcludeAssetsPlugin()
  ]
}
```

## License

Hippocratic License - See [LICENSE][licenseUrl]

&nbsp;

Created by [Ian Walter](https://ianwalter.dev)

[hwpUrl]: https://github.com/jantimon/html-webpack-plugin
[npmImage]: https://img.shields.io/npm/v/@ianwalter/exclude-assets-plugin.svg
[npmUrl]: https://www.npmjs.com/package/@ianwalter/exclude-assets-plugin
[ciImage]: https://github.com/ianwalter/exclude-assets-plugin/workflows/CI/badge.svg
[ciUrl]: https://github.com/ianwalter/exclude-assets-plugin/actions
[licenseUrl]: https://github.com/ianwalter/exclude-assets-plugin/blob/master/LICENSE
