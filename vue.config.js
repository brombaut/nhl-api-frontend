module.exports = {
  publicPath: "/nhl-api-frontend/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "Literal Dust";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";'
      }
    }
  }
};
