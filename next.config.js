const withLess = require('@zeit/next-less');

module.exports = withLess({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: true,
    },
});
