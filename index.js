function filterAssets (assets, matchers) {
  return assets.filter(asset => {
    const ref = asset.tagName === 'script' ? 'src' : 'href'
    return !matchers.find(matcher => matcher.test(asset.attributes[ref]))
  })
}

class ExcludeAssetsPlugin {
  apply (compiler) {
    const byHWP = plugin => plugin.constructor.name === 'HtmlWebpackPlugin'
    const plugins = compiler.options.plugins.filter(byHWP)

    compiler.hooks.compilation.tap('ExcludeAssetsPlugin', compilation => {
      const logger = compilation.getLogger('ExcludeAssetsPlugin')
      logger.debug('Registering alterAssetTags hook for html plugin(s)')

      for (const plugin of plugins) {
        plugin.constructor.getHooks(compilation).alterAssetTags.tap(
          'ExcludeAssetsPlugin',
          data => {
            const { plugin, assetTags } = data
            const matchers = plugin.options.excludeAssets
            if (matchers) {
              assetTags.scripts = filterAssets(assetTags.scripts, matchers)
              assetTags.styles = filterAssets(assetTags.styles, matchers)
              logger.debug('assetTags modified', assetTags)
            } else {
              logger.debug('assetTags not modified, no matchers found')
            }
            return data
          }
        )
      }
    })
  }
}

module.exports = ExcludeAssetsPlugin
