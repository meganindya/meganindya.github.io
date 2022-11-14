module.exports = {
    printWidth: 100,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: true,
    quoteProps: 'consistent',
    trailingComma: 'none',
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'lf',

    overrides: [
        {
            files: ['*.json', '*.jsonc', '*.yml', '*.html', '*.css', '*.scss', '*.tsx', '*.vue'],
            options: {
                tabWidth: 2
            }
        }
    ]
};
