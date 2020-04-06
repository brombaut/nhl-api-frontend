module.exports = {
  publicPath: '/nhl-api-frontend/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";',
      },
    },
  },
};
