const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: './src/main.js',
    react: './src/react.js'
  },
  mode: 'none',
  optimization: {
    splitChunks: {
      chunks: 'all' // 分离公共模块
    }
  },
  output: {
    filename: '[name].[contenthash:8].bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false, // https://github.com/vuejs/vue-loader/issues/1612
            limit: 10 * 1024 // 10 KB 以下 url-loader 处理 base64， 以上 file-loader 处理
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader',
      //   enforce: 'pre'
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Vue',
      templateParameters: {
        'BASE_URL': './'
      },
      template: './public/index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      title: 'React',
      templateParameters: {
        'BASE_URL': './'
      },
      filename: 'react.html',
      template: './public/index.html',
      chunks: ['react']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].bundle.css',
    })
  ]
}