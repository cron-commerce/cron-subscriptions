const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {join} = require('path')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  entry: {
    'checkout': join(__dirname, 'checkout/index.tsx'),
    'shopify-admin': join(__dirname, 'shopify-admin/index.tsx'),
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
    filename: '[name].[contenthash].js',
    path: join(__dirname, '.dist', 'public', 'assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new ManifestPlugin({
      writeToFileEmit: true
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  }
}