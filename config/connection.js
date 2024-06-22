const mongoose = require('mongoose');

mongoose.connect(process.env.MONGDB_URI|| 'mongodb://localhost:27017/nkNoSql', { useNewURLParser: true, useUnifiedTopology: true });

module.exports = mongoose.connection
