const {join} = require('path')

module.exports = {
  entry: [join(__dirname, 'shopify-admin-app/index.tsx')],
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: 'ts-loader',
    }],
  },
  output: {
    filename: 'shopify-admin-app.js',
    path: join(__dirname, '.dist-client'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}