# suttu
`npm create vite@latest `

suttu:https://suttu-p215.onrender.com

when we use variable MONGO_DB to terminal WINDOWS PowerShell:$env:MONGODB_URI="your_connection_string_here"; npm run dev

cheking how IP used app

`netstat -aon | findstr LISTENING`

`npm install eslint @eslint/js --save-dev`
`npx eslint --init`
`npm install --save-dev @stylistic/eslint-plugin`


```js
import globals from 'globals'
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin'
import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  {
    ignores: ['dist/**'],
  },
]

```

`npm install --save-dev chalk@4`
`npm install --save-dev shx`
`npm install cross-env`
`npm install --save-dev supertest `
