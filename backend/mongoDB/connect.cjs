const { mongoclient } = require('mongodb');
require('dotenv').config({ path: './config.env' });

async function connectToMongoDB() {
    
    const db = process.env.ATLAS_URI;

    try {
        const client = new mongoclient(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        console.log('Connected to MongoDB Atlas');
        return client;
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }
}