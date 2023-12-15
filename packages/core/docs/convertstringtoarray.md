# convertStringToArray(text)

Converts text to an array separating the words

- `text` `<Strig>` The text you want convert

## Example
```js
const { convertStringToArray } = require("@bready/core");
console.log(converStringToArray("I really like dogs and nice people"));
// Expected output:
// [
//  'I',      'really',
//  'like',   'dogs',
//  'and',    'nice',
//  'people'
// ]
```