import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "withdrawal"],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Transaction", transactionSchema);