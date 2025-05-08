module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        [
          'module-resolver',
          {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            alias: {
              '@': './app', // <- ajuste esse caminho conforme onde está a pasta "components"
            },
          },
        ],
      ],
    };
  };
  