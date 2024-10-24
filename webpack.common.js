const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config(); // Lädt die Variablen aus der .env-Datei

module.exports = {
  mode: 'development', // oder 'production'
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL), // Definiert die BASE_URL
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV), // Definiert NODE_ENV (optional)
    }),
  ],
};
