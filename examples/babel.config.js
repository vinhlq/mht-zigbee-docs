module.exports = function (api) {
    api.cache(true);

    return {
        presets: [
            ["@babel/preset-env", {
                "targets": {
                    "node": "current"
                }
            }]
        ],
        plugins: [
            "@babel/plugin-transform-runtime",
            "@babel/plugin-syntax-dynamic-import",
            "@babel/plugin-syntax-import-meta",
            ["@babel/plugin-proposal-class-properties", { "loose": false }],
            "@babel/plugin-proposal-json-strings",
            "@babel/plugin-proposal-function-sent",
            "@babel/plugin-proposal-export-namespace-from",
            "@babel/plugin-proposal-numeric-separator",
            "@babel/plugin-proposal-throw-expressions",
            "@babel/plugin-proposal-object-rest-spread",
            "@babel/plugin-transform-object-assign",
            "@babel/plugin-transform-typescript",

            "@babel/plugin-transform-arrow-functions",
            "@babel/plugin-transform-block-scoped-functions",
            "@babel/plugin-transform-block-scoping"


        ],
        ignore: [
            '**/node_modules/*',
            '**/dist/*'
        ]
    };
}
