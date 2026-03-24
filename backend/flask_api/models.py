# MODELS

# User model
class User:
	def __init__(self, user_id, name, email):
		self.user_id = user_id
		self.name = name
		self.email = email

	def to_dict(self):
		return {
			'user_id': self.user_id,
			'name': self.name,
			'email': self.email
		}

# Account model
class Account:
	def __init__(self, account_id, user_id, balance=0.0):
		self.account_id = account_id
		self.user_id = user_id
		self.balance = balance

	def to_dict(self):
		return {
			'account_id': self.account_id,
			'user_id': self.user_id,
			'balance': self.balance
		}

# Transaction model
class Transaction:
	def __init__(self, transaction_id, account_id, amount, type):
		self.transaction_id = transaction_id
		self.account_id = account_id
		self.amount = amount
		self.type = type  # 'deposit' or 'withdrawal'

	def to_dict(self):
		return {
			'transaction_id': self.transaction_id,
			'account_id': self.account_id,
			'amount': self.amount,
			'type': self.type
		}
