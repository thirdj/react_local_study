const webpack = require('webpack');
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  context: __dirname + '/app',
  entry: {
    javascript: './index.js', // jsx 는 명시해야 하고 js 는 .js 빼도 됨.
    html: './index.html'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  // debug: true,
  devtool: 'source-map',
  // devServer: {
  //   inline: true,
  //   port: 3333
  // },
  plugins: [
    new webpack.SourceMapDevToolPlugin({filename: __dirname + '/dist/[name].map'})
    // new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};
