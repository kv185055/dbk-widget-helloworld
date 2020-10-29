const {
    getWidgetWebpackConfig,
} = require('@dbank-ui-lib/widget-webpack-build-config');

module.exports = function(webpackEnv, webpackOptions) {
    process.env.BABEL_ENV = webpackOptions.mode;
    process.env.NODE_ENV = webpackOptions.mode;

    const options = {
        entryName: 'ClockWidget',
        entryFile: './src/js/ClockWidget.js',
        htmlFileName: 'index.html',
        htmlTemplatePath: 'public/index.html',
        devModeEntryFile: './src/js/index.js',
        devServerPort: 3020,
        mode: webpackOptions.mode
    };

    return getWidgetWebpackConfig(options);

}
