module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["mocha", "chai", "sinon-chai"],
    client: {
      chai: {
        includeStack: true,
      },
    },

    files: ["dist/test/**/*.test.js"],
    exclude: [],
    preprocessors: {},
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
  });
};
