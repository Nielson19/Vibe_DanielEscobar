from flask import Flask, request, jsonify
from flask_cors import CORS
from models import User, Account, Transaction
# In a real application, these would be defined in separate files and use a database for storage.

# NOTE: "to_dict" method is added to each model class to convert the object into a 
# dictionary format that can be easily serialized to JSON when sending responses 
# from the API endpoints.


# In-memory storage (for demonstration)
users = {}
accounts = {}
transactions = {}

# Flask app setup
app = Flask(__name__)
CORS(app)

# MAIN

@app.route('/')
def index():
    return jsonify({"message": "Welcome to the Banking API"})

# USER ENDPOINTS

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
	data = request.json
	user_id = str(len(users) + 1)
	user = User(user_id, data['name'], data['email'])
	users[user_id] = user
	return jsonify(user.to_dict()), 201


@app.route('/users', methods=['GET'])
def get_users():
	return jsonify([user.to_dict() for user in users.values()])

# ACCOUNT ENDPOINTS

# Create a new account for a user
@app.route('/accounts', methods=['POST'])
def create_account():
	data = request.json
	account_id = str(len(accounts) + 1)
	user_id = data['user_id']
	account = Account(account_id, user_id, data.get('balance', 0.0))
	accounts[account_id] = account
	return jsonify({ "message": f"Account of {users[user_id].name} created successfully",
				 "account": account.to_dict()}), 201


# Get all accounts
@app.route('/accounts', methods=['GET'])
def get_accounts():
	return jsonify([account.to_dict() for account in accounts.values()])

# TRANSACTION ENDPOINTS

# Create a new transaction (deposit or withdrawal)
@app.route('/transactions', methods=['POST'])
def create_transaction():
	data = request.json # collects the transaction data from the request body
	transaction_id = str(len(transactions) + 1) # counting transactions to generate a new ID
	account_id = data['account_id']
	amount = data['amount']
	type = data['type'] # 'deposit' or 'withdrawal'
	
	# Update account balance
	account = accounts.get(account_id) # get account first
	# account validation: check if the account exists, if not return an error response
	if not account:
		return jsonify({'error': 'Account not found'}), 404
	
    #transaction validation: check if the transaction type is valid and if it's a withdrawal, check if there are sufficient funds in the account
	if type == 'deposit':
		account.balance += amount
	elif type == 'withdrawal':
		if account.balance < amount:
			return jsonify({'error': 'Insufficient funds'}), 400
		account.balance -= amount
	else:
		return jsonify({'error': 'Invalid transaction type'}), 400
	
    #populate the transaction data and store it in the transactions dictionary
	transaction = Transaction(transaction_id, account_id, amount, type)
	
    #store the transaction in the transactions dictionary using the transaction ID as the key
	transactions[transaction_id] = transaction
	return jsonify({"message": "Transaction created successfully",
					"transaction": transaction.to_dict(),
					"currentBalance": account.balance}), 201

@app.route('/transactions', methods=['GET'])
def get_transactions():
	return jsonify([transaction.to_dict() for transaction in transactions.values()])

# makes sure that this file runs when the name is prompted on the terminal.
if __name__ == '__main__':
	app.run(debug=True)         