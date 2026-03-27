import mongoose from "mongoose";   
import Account from "../models/accounts.js";
import Transaction from "../models/transactions.js";

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Account.find().populate("user_id", "name email");
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAccountsById = async (req, res) => {
    try {
        const accounts = await Account.find({ user_id: req.params.id }).populate("user_id", "name email");
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addAccount = async (req, res) => {
    const { user_id, balance } = req.body;
    try {
        const newAccount = new Account({ user_id, balance });
        await newAccount.save();
        res.status(201).json(newAccount);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const removeAccount = async (req, res) => {
    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        await Transaction.deleteMany({ account_id: account._id }); // Remove related transactions
        await account.remove();
        res.json({ message: "Account and related transactions deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};