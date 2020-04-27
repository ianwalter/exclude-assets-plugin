const path = require('path')
const { test } = require('@ianwalter/bff')
const clone = require('@ianwalter/clone')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MemoryFileSystem = require('memory-fs')
const ExcludeAssetsPlugin = require('.')

const baseConfig = require('./fixtures/webpack.config.js')

test('excluding js assets', (t, done) => {
  const config = clone(baseConfig)
  config.plugins.push(new HtmlWebpackPlugin({
    template: './fixtures/template.html',
    excludeAssets: [/\.js/]
  }))
  config.plugins.push(new ExcludeAssetsPlugin())
  const compiler = webpack(config)
  const mfs = new MemoryFileSystem()
  compiler.outputFileSystem = mfs
  compiler.run((_, stats) => {
    const logs = stats.compilation.logging.get('ExcludeAssetsPlugin')
    logs.forEach(log => t.print.info(...log.args))
    const index = mfs.readFileSync(
      path.join(__dirname, 'dist', 'index.html'),
      'utf8'
    )
    t.expect(index.includes('main.js')).toBe(false)
    done()
  })
})
