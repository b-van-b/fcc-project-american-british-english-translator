const chai = require("chai");
const assert = chai.assert;

const ATOB = "american-to-british";
const BTOA = "british-to-american";

const Translator = require("../components/translator.js");
const translator = new Translator();

const doTrans = (text, locale, simple) => {
  // translate a string
  const result = translator.translate(text, locale);
  // strip HTML tags if asked
  if (simple) {
    result.translation = result.translation.replace(/<.*?>/g, "");
  }
  return result;
};

suite("Unit Tests", () => {
  test(`Translate "Mangoes are my favorite fruit." to British English`, () => {
    const oldSentence = "Mangoes are my favorite fruit.";
    const newSentence = "Mangoes are my favourite fruit.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "I ate yogurt for breakfast." to British English`, () => {
    const oldSentence = "I ate yogurt for breakfast.";
    const newSentence = "I ate yoghurt for breakfast.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "We had a party at my friend's condo." to British English`, () => {
    const oldSentence = "We had a party at my friend's condo.";
    const newSentence = "We had a party at my friend's flat.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Can you toss this in the trashcan for me?" to British English`, () => {
    const oldSentence = "Can you toss this in the trashcan for me?";
    const newSentence = "Can you toss this in the bin for me?";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "The parking lot was full." to British English`, () => {
    const oldSentence = "The parking lot was full.";
    const newSentence = "The car park was full.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Like a high tech Rube Goldberg machine." to British English`, () => {
    const oldSentence = "Like a high tech Rube Goldberg machine.";
    const newSentence = "Like a high tech Heath Robinson device.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "To play hooky means to skip class or work." to British English`, () => {
    const oldSentence = "To play hooky means to skip class or work.";
    const newSentence = "To bunk off means to skip class or work.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "No Mr. Bond, I expect you to die." to British English`, () => {
    const oldSentence = "No Mr. Bond, I expect you to die.";
    const newSentence = "No Mr Bond, I expect you to die.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Dr. Grosh will see you now." to British English`, () => {
    const oldSentence = "Dr. Grosh will see you now.";
    const newSentence = "Dr Grosh will see you now.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Lunch is at 12:15 today." to British English`, () => {
    const oldSentence = "Lunch is at 12:15 today.";
    const newSentence = "Lunch is at 12.15 today.";
    assert.deepEqual(doTrans(oldSentence, ATOB, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "We watched the footie match for a while." to American English`, () => {
    const oldSentence = "We watched the footie match for a while.";
    const newSentence = "We watched the soccer match for a while.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Paracetamol takes up to an hour to work." to American English`, () => {
    const oldSentence = "Paracetamol takes up to an hour to work.";
    const newSentence = "Tylenol takes up to an hour to work.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "First, caramelise the onions." to American English`, () => {
    const oldSentence = "First, caramelise the onions.";
    const newSentence = "First, caramelize the onions.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "I spent the bank holiday at the funfair." to American English`, () => {
    const oldSentence = "I spent the bank holiday at the funfair.";
    const newSentence = "I spent the public holiday at the carnival.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "I had a bicky then went to the chippy." to American English`, () => {
    const oldSentence = "I had a bicky then went to the chippy.";
    const newSentence = "I had a cookie then went to the fish-and-chip shop.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "I've just got bits and bobs in my bum bag." to American English`, () => {
    const oldSentence = "I've just got bits and bobs in my bum bag.";
    const newSentence = "I've just got odds and ends in my fanny pack.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "The car boot sale at Boxted Airfield was called off." to American English`, () => {
    const oldSentence = "The car boot sale at Boxted Airfield was called off.";
    const newSentence = "The swap meet at Boxted Airfield was called off.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Have you met Mrs Kalyani?" to American English`, () => {
    const oldSentence = "Have you met Mrs Kalyani?";
    const newSentence = "Have you met Mrs. Kalyani?";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Prof Joyner of King's College, London." to American English`, () => {
    const oldSentence = "Prof Joyner of King's College, London.";
    const newSentence = "Prof. Joyner of King's College, London.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Translate "Tea time is usually around 4 or 4.30." to American English`, () => {
    const oldSentence = "Tea time is usually around 4 or 4.30.";
    const newSentence = "Tea time is usually around 4 or 4:30.";
    assert.deepEqual(doTrans(oldSentence, BTOA, true), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Highlight translation in "Mangoes are my favorite fruit."`, () => {
    const oldSentence = "Mangoes are my favorite fruit.";
    const newSentence = `Mangoes are my <span class="highlight">favourite</span> fruit.`;
    assert.deepEqual(doTrans(oldSentence, ATOB, false), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Highlight translation in "I ate yogurt for breakfast."`, () => {
    const oldSentence = "I ate yogurt for breakfast.";
    const newSentence = `I ate <span class="highlight">yoghurt</span> for breakfast.`;
    assert.deepEqual(doTrans(oldSentence, ATOB, false), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Highlight translation in "We watched the footie match for a while."`, () => {
    const oldSentence = "We watched the footie match for a while.";
    const newSentence = `We watched the <span class="highlight">soccer</span> match for a while.`;
    assert.deepEqual(doTrans(oldSentence, BTOA, false), {
      text: oldSentence,
      translation: newSentence,
    });
  });

  test(`Highlight translation in "Paracetamol takes up to an hour to work."`, () => {
    const oldSentence = "Paracetamol takes up to an hour to work.";
    const newSentence = `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
    assert.deepEqual(doTrans(oldSentence, BTOA, false), {
      text: oldSentence,
      translation: newSentence,
    });
  });
});
