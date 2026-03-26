const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function main() {
    const db = process.env.ATLAS_URI;
    const client = new MongoClient(db);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }

  try {
    const database = client.db('SimpleBank');
    const collections = await database.collections();
    collections.forEach(collection => {
      console.log(`Collection: ${collection.s.namespace.collection}`);
    });
    } catch (error) {
    console.error('Error listing collections:', error);
  } finally {
    await client.close();
    console.log('Connection to MongoDB Atlas closed');
  }
}

main();