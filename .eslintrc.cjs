/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-typescript/recommended',
        '@vue/eslint-config-prettier',
        'eslint:recommended'
    ],

    env: {
        'vue/setup-compiler-macros': true
    },

    root: true,

    parserOptions: {
        ecmaVersion: 2020
    },

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-mixed-spaces-and-tabs': 'error',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error', 'nofunc'],
        '@typescript-eslint/no-non-null-assertion': 'off',
        'semi': ['error', 'always'],
        'prefer-const': ['off'],
        'no-trailing-spaces': [
            'warn',
            {
                skipBlankLines: true,
                ignoreComments: true
            }
        ],
        'no-duplicate-case': 'error',
        'no-irregular-whitespace': 'warn',

        'max-len': 'off',
        'vue/max-len': [
            'warn',
            {
                code: 100,
                template: 100,
                tabWidth: 2,
                comments: 100,
                ignorePattern: '',
                ignoreComments: true,
                ignoreTrailingComments: true,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
                ignoreRegExpLiterals: true,
                ignoreHTMLAttributeValues: true,
                ignoreHTMLTextContents: true
            }
        ]
    },

    overrides: [
        {
            files: [
                'cypress/integration/**.spec.{js,ts,jsx,tsx}',
                'cypress/plugins/**.{js,ts,jsx,tsx}'
            ],
            extends: ['plugin:cypress/recommended']
        }
    ]
};
