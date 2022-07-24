const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});
  
    await User.collection.insertMany(usersData);
  
    console.table(usersData);
    process.exit(0);
})