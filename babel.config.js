module.exports = function(api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          "root": './src',
          "alias": {
            "@assets/*": "assets/*"
          }
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  };
};
