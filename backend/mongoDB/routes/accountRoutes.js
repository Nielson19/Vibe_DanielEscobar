
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const AccountModel = mongoose.models.Account || mongoose.model('Account', new mongoose.Schema({
	user_id: String,
	balance: Number,
	account_type: { type: String, default: 'checking' },
}));

// Create account for a user
router.post('/user/:user_id', async (req, res) => {
	const { user_id } = req.params;
	const { balance = 0.0, account_type = 'checking' } = req.body;
	try {
		const account = new AccountModel({ user_id, balance, account_type });
		await account.save();
		res.status(201).json({ message: `Account for user_id ${user_id} created successfully`, account });
	} catch (err) {
		res.status(500).json({ error: 'Failed to create account' });
	}
});

// Get all accounts
router.get('/', async (req, res) => {
	try {
		const accounts = await AccountModel.find();
		res.json({ accounts });
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch accounts' });
	}
});

// Get accounts by user
router.get('/user/:user_id', async (req, res) => {
	try {
		const accounts = await AccountModel.find({ user_id: req.params.user_id });
		res.json({ accounts });
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch user accounts' });
	}
});

// Delete account (and related transactions)
router.delete('/:account_id', async (req, res) => {
	try {
		const accountId = req.params.account_id;
		await mongoose.connection.collection('transactions').deleteMany({ account_id: accountId });
		await AccountModel.findByIdAndDelete(accountId);
		res.json({ message: `Account ${accountId} deleted successfully.` });
	} catch (err) {
		res.status(500).json({ error: 'Failed to delete account' });
	}
});

module.exports = router;
