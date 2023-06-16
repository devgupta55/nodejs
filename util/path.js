const path = require('path');
module.exports = path.dirname(process.mainModule.filename); 
//mainModule will refer to the main module i.e. app.js
