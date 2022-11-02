const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to /api/translate", (done) => {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = "british-to-american";
    const trans = `<span class="highlight">Tylenol</span> takes up to an hour to work.`;
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(
          res.body,
          {
            text: text,
            translation: trans,
          },
          "Should return original text and correct translation"
        );
        done();
      });
  });
  test("Translation with text and invalid locale field: POST request to /api/translate", (done) => {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = "cockney-to-southern";
    const error = { error: "Invalid value for locale field" };
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, error, "Should return error");
        done();
      });
  });
  test("Translation with missing text field: POST request to /api/translate", (done) => {
    const text = null;
    const locale = "british-to-american";
    const error = { error: "Required field(s) missing" };
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, error, "Should return error");
        done();
      });
  });
  test("Translation with missing locale field: POST request to /api/translate", (done) => {
    const text = "Paracetamol takes up to an hour to work.";
    const locale = null;
    const error = { error: "Required field(s) missing" };
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, error, "Should return error");
        done();
      });
  });
  test("Translation with empty text: POST request to /api/translate", (done) => {
    const text = "";
    const locale = "british-to-american";
    const error = { error: "No text to translate" };
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, error, "Should return error");
        done();
      });
  });
  test("Translation with text that needs no translation: POST request to /api/translate", (done) => {
    const text = "Hello!";
    const locale = "british-to-american";
    const trans = "Everything looks good to me!";
    chai
      .request(server)
      .post("/api/translate")
      .send({
        text: text,
        locale: locale,
      })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(
          res.body,
          {
            text: text,
            translation: trans,
          },
          "Should return original text with message 'Everything looks good to me!'"
        );
        done();
      });
  });
});
