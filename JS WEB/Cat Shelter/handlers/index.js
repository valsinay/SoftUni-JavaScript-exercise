const homeHandler = require("./home");
const staticFiles = require("./static-files");
const catHanlder = require('./cat');

module.exports = [homeHandler, staticFiles, catHanlder];