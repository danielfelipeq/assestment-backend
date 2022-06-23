const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.MONGO_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
  });
  mongoose.connection.on('error', (error) => {
    console.log('Error connecting to MongoDB: ', error);
  });
  return mongoose.connection;
}

module.exports = { connect };
