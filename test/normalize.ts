import t from 'tap'
import {
  lowerFirstLetter,
  stripPrefix,
  lowerCamelCase,
} from '../src/normalize'

t.test('lowerFirstLetter', (t) => {
  t.equal(
    lowerFirstLetter('Hello'),
    'hello',
    'should convert the first letter to lowercase'
  )
  t.equal(
    lowerFirstLetter(''),
    '',
    'should return an empty string for an empty input'
  )
  t.equal(
    lowerFirstLetter('123'),
    '123',
    'should not modify non-alphabetic characters'
  )
  t.end()
})

t.test('stripPrefix', (t) => {
  t.equal(
    stripPrefix('Hello', 'He'),
    'llo',
    'should remove the prefix from the string'
  )
  t.equal(
    stripPrefix('Hello', 'Hi'),
    'Hello',
    'should not modify the string if the prefix is not found'
  )
  t.equal(
    stripPrefix('123', '12'),
    '3',
    'should remove the prefix from the string containing non-alphabetic characters'
  )
  t.end()
})

t.test('lowerCamelCase', (t) => {
  t.equal(
    lowerCamelCase('hello_world'),
    'helloWorld',
    'should convert snake_case to lower camelCase'
  )
  t.equal(
    lowerCamelCase('HelloWorld'),
    'helloWorld',
    'should convert PascalCase to lower camelCase'
  )
  t.equal(
    lowerCamelCase('hello-world'),
    'helloWorld',
    'should convert kebab-case to lower camelCase'
  )
  t.equal(
    lowerCamelCase('hello123world'),
    'hello123world',
    'should not modify alphanumeric characters'
  )
  t.equal(
    lowerCamelCase(''),
    '',
    'should return an empty string for an empty input'
  )
  t.equal(
    lowerCamelCase('praw_formaWlasnosci_Symbol'),
    'prawFormaWlasnosciSymbol',
    'should convert mixed snake_case and PascalCase to lower camelCase'
  )
  t.end()
})
