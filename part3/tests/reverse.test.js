const { test } = require('node:test')
const assert = require('node:assert')

const reverse = require('../utils/for_testing').reverse

test('reverse of sagdiana', () => {
  const result = reverse('sagdiana')

  assert.strictEqual(result, 'anaidgas')
})

test('reverse of dildora', () => {
  const result = reverse('dildora')

  assert.strictEqual(result, 'arodlid')
})

test('reverse of jasur', () => {
  const result = reverse('jasur')

  assert.strictEqual(result, 'rusaj')
})