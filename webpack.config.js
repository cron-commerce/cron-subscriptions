const {join} = require('path')

module.exports = {
  entry: {
    'checkout': join(__dirname, 'checkout/index.tsx'),
    'shopify-admin-app': join(__dirname, 'shopify-admin-app/index.tsx'),
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [{
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: 'ts-loader',
    }],
  },
  output: {
    path: join(__dirname, '.dist', 'public', 'scripts'),
    publicPath: '/public/scripts',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}