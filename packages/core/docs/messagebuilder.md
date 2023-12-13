# messageBuilder(text)

Format your object into normal text

- `text` `<Object>` Object containing strings

## Example
```js
const {  messageBuilder } = require("@bready/core");
console.log(messageBuilder(["This is line1", "This is a long line called 2", "3"]))
// Expected output:
// This is line1
// This is a long line called2
// 3
```