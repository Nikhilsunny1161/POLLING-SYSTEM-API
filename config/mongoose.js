const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nikhil:11610571@cluster0.cbmfz.mongodb.net/polling_system_api?retryWrites=true&w=majority&appName=Cluster0');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
