const { resolve } = require('path')

const rootPath = resolve(__dirname, '../src')

module.exports = ({ config }) => {
  config.module.rules.push(
    {
      test: /\.ts$/,
      loader: require.resolve('ts-loader'),
      options: {
        appendTsSuffixTo: [/\.vue$/],
        transpileOnly: true
      }
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'style-resources-loader',
          options: {
            patterns: [
              resolve(rootPath, 'assets/css/_easing.scss'),
              resolve(rootPath, 'assets/css/_function.scss'),
              resolve(rootPath, 'assets/css/_setting.scss'),
              resolve(rootPath, 'assets/css/mixins/*.scss')
            ]
          }
        }
      ]
    }
  )

  config.resolve.extensions.push('.ts')

  config.resolve.alias['~~'] = resolve(__dirname, '..')
  config.resolve.alias['~'] = resolve(__dirname, '../src')

  return config
}
