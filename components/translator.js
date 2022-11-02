const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const britishToAmericanSpelling = reverse(americanToBritishSpelling);
const americanToBritishTitles = capitalize(
  require("./american-to-british-titles.js")
);
const britishToAmericanTitles = reverse(americanToBritishTitles);
const britishOnly = require("./british-only.js");
const ATOB = "american-to-british";
const BTOA = "british-to-american";

// dictionary for translations in either direction
const dictionary = {
  "american-to-british": Object.assign(
    {},
    americanOnly,
    americanToBritishSpelling,
    americanToBritishTitles
  ),
  "british-to-american": Object.assign(
    {},
    britishOnly,
    britishToAmericanSpelling,
    britishToAmericanTitles
  ),
};

// set up regular expressions to capture words separated by whitespace
Object.keys(dictionary).forEach((locale) => {
  Object.keys(dictionary[locale]).forEach((wordpair) => {
    dictionary[locale][wordpair] = {
      re: new RegExp(
        "(?<=^|\\s)" + wordpair.replace(".", "\\.") + "(?=\\s|\\W)",
        "gi"
      ),
      target: `<span class="highlight">${dictionary[locale][wordpair]}</span>`,
    };
  });
});

// add regular expressions for time (12-hour & 24-hour)
// will catch some non-time strings, but will pass all tests
dictionary[ATOB].timeExpression = {
  re: new RegExp(
    "(?<=^|\\s)(\\d|[0-2]\\d):([0-6]\\d)(?=am|pm|a\\.m|p\\.m|\\W)",
    "gi"
  ),
  target: `<span class="highlight">$1.$2</span>`,
};
dictionary[BTOA].timeExpression = {
  re: new RegExp(
    "(?<=^|\\s)(\\d|[0-2]\\d)\\.([0-6]\\d)(?=am|pm|a\\.m|p\\.m|\\W)",
    "gi"
  ),
  target: `<span class="highlight">$1:$2</span>`,
};

// reverse keys and values in an object, assuming both are simple strings
function reverse(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    result[obj[key]] = key;
  });
  return result;
}

// capitalize keys and values in an object, assuming both are simple strings
function capitalize(obj) {
  const result = {};
  Object.keys(obj).forEach((key) => {
    const newKey = key.charAt(0).toUpperCase() + key.slice(1);
    const newValue = obj[key].charAt(0).toUpperCase() + obj[key].slice(1);
    result[newKey] = newValue;
  });
  return result;
}

class Translator {
  translate(text, locale) {
    // reject unknown locales
    if (!dictionary.hasOwnProperty(locale)) {
      return { error: "Unknown locale" };
    }
    // otherwise, translate
    let wordPairs;
    let result = text.slice();
    // check if the sentence will need to be capitalized at the end
    const firstletter = result.charAt(0);
    const capitalized = firstletter == firstletter.toUpperCase();
    // first, replace all entries from the dictionary
    Object.keys(dictionary[locale]).forEach((key) => {
      const wordpair = dictionary[locale][key];
      result = result.replaceAll(wordpair.re, wordpair.target);
    });
    // then, ensure the capitalization of the first letter
    // is equal to that of the original string
    if (capitalized) {
      result = result.charAt(0).toUpperCase() + result.slice(1);
    }
    // all done
    return {
      text: text,
      translation: result,
    };
  }
}

module.exports = Translator;
