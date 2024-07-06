const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/nkNoSql');

module.exports = mongoose.connection
