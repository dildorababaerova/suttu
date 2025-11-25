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
The following command only runs the tests found in the tests/note_api.test.js file:
`npm test -- tests/note_api.test.js` // tested, works only this command in Windows
`npm test -- --test-name-pattern="a specific note is within the returned notes"`
`npm test -- --test-only`

200 OK — запрос выполнен успешно, данные возвращены (например, GET /api/persons).

201 Created — новый ресурс успешно создан (например, POST /api/persons).

204 No Content — запрос успешен, но тело ответа пустое (например, успешное удаление DELETE /api/persons/:id).

400 Bad Request — неверный запрос, например, отсутствуют обязательные поля (name или phoneNumber).

401 Unauthorized — не авторизован для доступа к ресурсу.

403 Forbidden — авторизован, но доступ запрещён.

404 Not Found — ресурс не найден (неверный путь или ID).

409 Conflict — конфликт, например, при попытке создать дубликат.

500 Internal Server Error — непредвиденная ошибка на сервере (например, сбой базы данных).

503 Service Unavailable — сервер временно недоступен (например, из-за нагрузки).
