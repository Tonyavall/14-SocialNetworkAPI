const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await Thought.deleteMany({});
    await User.deleteMany({});
  
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(videos);
  
    console.table(users);
    console.table(videos);
    process.exit(0);
})