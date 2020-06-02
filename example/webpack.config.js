const path = require('path')

module.exports = {
  entry: path.join(__dirname, './index.js'),
  devServer: {
    contentBase: path.join(__dirname, '.'),
    compress: false,
    port: 9500
  },
  module: {
    rules: [
      {
        test: /\.(gql|graphql)/i,
        loaders: [require.resolve('../src')]
      }
    ]
  }
}