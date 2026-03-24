from flask import Flask, request, jsonify
from flask_cors import CORS
from models import User, Account, Transaction
from seed import users, accounts, transactions
import mysql.connector
# In a real application, these would be defined in separate files and use a database for storage.

# NOTE: "to_dict" method is added to each model class to convert the object into a 
# dictionary format that can be easily serialized to JSON when sending responses 
# from the API endpoints.

#generate a connection to the MySQL database using the mysql.connector library.
con=mysql.connector.connect(
    host="localhost",
    user="root",
    password="bazinga2010.",
    database="simpleBank"
)

# Flask app setup
app = Flask(__name__)
CORS(app)

# MAIN
@app.route('/')
def index():
    return jsonify({"message": "Welcome to Simple Bank"})

# USER ENDPOINTS

# Create a new user
@app.route('/users', methods=['POST'])
def create_user():
	data = request.get_json()
	name = data.get("name")
	email = data.get('email')
	cursor = con.cursor()
	cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
	con.commit()
	user_id = cursor.lastrowid
	user = User(user_id, name, email)
	cursor.close()
	return jsonify({ "message": f"User {name} created successfully",
					"user": user.to_dict()}), 201


@app.route('/users', methods=['GET'])
def get_users():
	cursor = con.cursor(dictionary=True)
	cursor.execute("SELECT * FROM users")
	users_data = cursor.fetchall()
	cursor.close()
	return jsonify({"users": users_data}), 200



# ACCOUNT ENDPOINTS

# Create a new account for a user (DB version)
@app.route('/accounts', methods=['POST'])
def create_account():
	data = request.get_json()
	user_id = data.get('user_id')
	balance = data.get('balance', 0.0)
	cursor = con.cursor()
	cursor.execute("INSERT INTO accounts (user_id, balance) VALUES (%s, %s)", (user_id, balance))
	con.commit()
	account_id = cursor.lastrowid
	account = Account(account_id, user_id, balance)
	cursor.close()
	return jsonify({ "message": f"Account for user_id {user_id} created successfully",
					"account": account.to_dict()}), 201

# Get all accounts (DB version)
@app.route('/accounts', methods=['GET'])
def get_accounts():
	cursor = con.cursor(dictionary=True)
	cursor.execute("SELECT * FROM accounts")
	accounts_data = cursor.fetchall()
	cursor.close()
	return jsonify({"accounts": accounts_data}), 200


# TRANSACTION ENDPOINTS

# Create a new transaction (deposit or withdrawal) (DB version)
@app.route('/transactions', methods=['POST'])
def create_transaction():
	data = request.get_json()
	account_id = data.get('account_id')
	amount = float(data.get('amount'))
	type = data.get('type')  # 'deposit' or 'withdrawal'

	cursor = con.cursor(dictionary=True)
	# Check if account exists
	cursor.execute("SELECT * FROM accounts WHERE account_id = %s", (account_id,))
	account_row = cursor.fetchone()
	if not account_row:
		cursor.close()
		return jsonify({'error': 'Account not found'}), 404

	# Validate and update balance
	current_balance = float(account_row['balance'])
	if type == 'deposit':
		new_balance = current_balance + amount
	elif type == 'withdrawal':
		if current_balance < amount:
			cursor.close()
			return jsonify({'error': 'Insufficient funds'}), 400
		new_balance = current_balance - amount
	else:
		cursor.close()
		return jsonify({'error': 'Invalid transaction type'}), 400

	# Update account balance
	cursor.execute("UPDATE accounts SET balance = %s WHERE account_id = %s", (new_balance, account_id))

	# Insert transaction
	cursor.execute("INSERT INTO transactions (account_id, amount, type) VALUES (%s, %s, %s)", (account_id, amount, type))
	con.commit()
	transaction_id = cursor.lastrowid
	transaction = Transaction(transaction_id, account_id, amount, type)
	cursor.close()
	return jsonify({"message": "Transaction created successfully",
					"transaction": transaction.to_dict(),
					"currentBalance": new_balance}), 201


# Get all transactions (DB version)
@app.route('/transactions', methods=['GET'])
def get_transactions():
	cursor = con.cursor(dictionary=True)
	cursor.execute("SELECT * FROM transactions")
	transactions_data = cursor.fetchall()
	cursor.close()
	return jsonify({"transactions": transactions_data}), 200

# makes sure that this file runs when the name is prompted on the terminal.
if __name__ == '__main__':
	print("Connecting to Database...")
	app.run(debug=True)         