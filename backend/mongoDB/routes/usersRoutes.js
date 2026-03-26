
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User } = require('../models');
const UserModel = mongoose.model('User', new mongoose.Schema({
	name: String,
	email: String,
	password: String,
}));

// Register
router.post('/auth/register', async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res.status(400).json({ error: 'Name, email, and password are required.' });
	}
	if (await UserModel.findOne({ email })) {
		return res.status(409).json({ error: 'Email already registered.' });
	}
	const user = new UserModel({ name, email, password });
	await user.save();
	res.status(201).json({ message: `User ${name} registered successfully`, user });
});

// Login
router.post('/mongo/auth/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email, password });
	if (!user) {
		return res.status(401).json({ error: 'Invalid credentials.' });
	}
	res.json({ message: 'Login successful', user });
});

// Logout
router.post('/mongo/auth/logout', (req, res) => {
	res.json({ message: 'Logout successful' });
});

// Create user
router.post('/mongo/users', async (req, res) => {
	const { name, email, password } = req.body;
	const user = new UserModel({ name, email, password });
	await user.save();
	res.status(201).json({ message: `User ${name} created successfully`, user });
});

// Get all users
router.get('/mongo/users', async (req, res) => {
	const users = await UserModel.find();
	res.json({ users });
});

// Get user by id
router.get('/mongo/users/:user_id', async (req, res) => {
	const user = await UserModel.findById(req.params.user_id);
	if (!user) {
		return res.status(404).json({ error: 'User not found.' });
	}
	res.json({ user });
});

module.exports = router;
