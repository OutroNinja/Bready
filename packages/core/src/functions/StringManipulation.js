function capitalize(text) {
    return text.toLowerCase().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function reverseString(text) {
    return text.split("").reverse().join("");
}

function truncateString(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
    }
    return text;
}

function replaceString(text, replaces) {
  const regex = new RegExp(Object.keys(replaces).join('|'), 'g');
  const newText = text.replace(regex, match => replaces[match]);

  return newText;
}

function messageBuilder(text) {
    return text.join("\n");
}

module.exports = {
    capitalize,
    reverseString,
    truncateString,
    replaceString,
    messageBuilder
}
//a