import mongoose from "mongoose";
import Transaction from "../models/transactions.js";
import Account from "../models/accounts.js";

export const addTransaction = async (req, res) => {
    const { account_id, amount, type } = req.body;
    try {
        const account = await Account.findById(account_id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const newTransaction = new Transaction({ account_id, amount, type });
        await newTransaction.save();
        // Update account balance
        account.balance += type === "deposit" ? amount : -amount;
        await account.save();
        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getTransactionsByAccountId = async (req, res) => {
    try {
        const transactions = await Transaction.find({ account_id: req.params.accountId }).sort({ created_at: -1 });
        res.json({ transactions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find().populate("account_id", "account_type balance");
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};      