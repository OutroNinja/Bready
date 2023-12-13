# replaceString(text, replaces)

Change values ​​from a string to defined ones

- `text` `<String>` The original text
- `replaces` `<Array>` List of modifications that must be made

## Example
```js
const { replaceString } = require("@bready/core");
console.log(replaceString("👋 Hi, user", {"👋": "🤩", "user": "OutroNinja"}));
// Expected output:
// 🤩 Hi, OutroNinja
```