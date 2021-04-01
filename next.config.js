const withLess = require('@zeit/next-less');

module.exports = withLess({
    generateEtags: false,
    cssLoaderOptions: {
        importLoaders: true,
    },
    cssModules: true,
    poweredByHeader: false,
});
