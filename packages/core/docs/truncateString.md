# truncateString(text, maxLength)

Limits the size of your text

- `text` `<String>` The text you want to limit
- `maxLength <Number>` The maximum number of characters you must have

## Example
```js
const { truncateString } = require("@brady/core");
console.log(truncateString("This is a long long long long long long long text", 30));
// Expected output:
// This is a long long long long ...
```