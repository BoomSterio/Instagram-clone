const path = require('path')

const paths = {
  assets: path.resolve(__dirname, 'assets'),
  data: path.resolve(__dirname, 'data'),
  src: path.resolve(__dirname, 'src'),
}

module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      [
        "module-resolver",
        {
          "root": './src',
          "extensions": ['.js', '.jsx', '.es', '.es6', '.mjs', '.ts', '.tsx'],
          "alias": {
            data: './src/data',
            assets: './src/assets',
            types: './src/types',
            screens: './src/screens',
            providers: './src/providers',
            config: './src/config',
            components: './src/components',
          }
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  };
};
