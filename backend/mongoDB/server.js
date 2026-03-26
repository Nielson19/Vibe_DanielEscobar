
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.ATLAS_URI || 'mongodb://localhost:27017/SimpleBank';

mongoose.connect(MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Simple Bank (MongoDB/Express)' });
});


// Modular routes
const usersRoutes = require('./routes/usersRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionsRoutes = require('./routes/transactionsRoutes');

app.use('/api/users', usersRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionsRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
