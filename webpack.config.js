// const webpack = require('webpack');
const path = require('path');

const plugins = [
  /* new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
    },
  }),
   */
];
/*
if (process.env.NODE_ENV !== 'production') {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.NoEmitOnErrorsPlugin());
}
*/
// TODO : check how to configure webpack to output named resources (css, woff, etc ...)

const publicPath = process.env.NODE_ENV === 'dev' ? 'http://localhost:3000/js/bundle/' : '/js/bundle/';

module.exports = {
  output: {
    path: path.join(__dirname, '../../static/js/bundle/'),
    publicPath,
    filename: '[name].js',
    chunkFilename: 'bundle.[name].js',
    library: 'Battle',
    libraryTarget: 'umd',
  },
  entry: {
    bundle: './src/index.jsx',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
  },
  devServer: {
    port: process.env.DEV_SERVER_PORT || 3000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /nodeModules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
      /*,
      {
        test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        exclude: /\.useable\.css$/,
        loader: 'style-loader!css-loader',
      },*/
    ],
  },
  plugins,
};
