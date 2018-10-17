const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    }, {
      test: /\.scss$/,
      use: [
        process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader', 'sass-loader'
      ],
  }],
  },
  output: {
    path: join(__dirname, '.dist', 'public', 'assets'),
    publicPath: '/assets',
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}