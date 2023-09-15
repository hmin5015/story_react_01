const Ajv = require("ajv");
const ajv = new Ajv();

const schema = require("./schema.json");

const validate = ajv.compile(schema);

module.exports = { validate };
