import React from 'react'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { getAccountsById as getAccountsData, getUserById, addAccount  } from "../api/accountApi";

function Table({ userId }) {
  const rowStyle = "h-20 border-b items-center border-gray-700 hover:bg-gray-700/30 transition-colors w-1/4";
  const balanceStyle = "font-semibold text-gray-200 text-lg w-1/4";
  const accountTypeStyle = "text-sm text-gray-400 w-1/4";
  const accountNumberStyle = "mt-6 flex flex-row justify-center items-center text-sm text-gray-400 w-1/4";

  const [currentAccounts, setCurrentAccounts] = React.useState(null);
  const [accountUser, setAccountUser] = React.useState(null);
  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newBalance, setNewBalance] = React.useState(0);
  const [newType, setNewType] = React.useState('checking');

  React.useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          const res = await getAccountsData(userId);
          const userAccount = await getUserById(userId);
          setAccountUser(userAccount.data.user.name);
          setCurrentAccounts(res.data.accounts);
        } catch (err) {
          console.error("Error fetching user account:", err);
        }
      } else {
        console.error("No user ID provided to Table component");
      }
    };
    fetchData();
  }, [userId]);

  const handleAddAccountClick = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewBalance(0);
    setNewType('checking');
  };

  const handleTypeChange = (e) => {
    setNewType(e.target.value);
  };

  const handleBalanceChange = (e) => {
    setNewBalance(e.target.value);
  };

  // Placeholder for submit handler
  //TODO: Implement API call to add account there is a 500 internal error 
  //use postman first to test the endpoint and then implement the API call here
  const handleAddAccountSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to add account
    try {     
      await addAccount(userId, newBalance, newType); // Replace with actual API call
      console.log("Adding account with balance:", newBalance, "and type:", newType);
    } catch (err) {
      console.error("Error adding account:", err);
      // Optionally show error message to user
    }
    // After success:
    setShowAddForm(false);
    setNewBalance(0);
    setNewType('checking');
    // Optionally refresh account list
  };

  return (
    <div className="bg-gray-800/40 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-5xl border-2 border-gray-700">
      {/* Header Container */}
      <div className='flex flex-row justify-between items-center mb-6'>
        {/* Table Header Title and Icon */}
        <div className='flex flex-row items-center mb-1 gap-2'>
          <MdOutlineAccountBalanceWallet className="text-yellow-500 mr-2" size={30} />
          <h2 className="text-2xl font-bold text-gray-200 mb-0 text-start">Accounts</h2>
        </div>

        {!showAddForm && (
          <button
            className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition-colors"
            onClick={handleAddAccountClick}
          >
            Add Account
          </button>
        )}
      </div>

      {showAddForm ? (
        <form onSubmit={handleAddAccountSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-bold">Account Balance</label>
            <input
              type="number"
              value={newBalance}
              onChange={handleBalanceChange}
              className="w-full px-3 py-2 text-md border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-700/20 text-gray-200"
              placeholder="Enter initial balance"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 text-lg font-bold ">Account Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="checking"
                  checked={newType === 'checking'}
                  onChange={handleTypeChange}
                  className="accent-yellow-500"
                />
                <p className='text-white text-bold'>Checking</p>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="accountType"
                  value="savings"
                  checked={newType === 'savings'}
                  onChange={handleTypeChange}
                  className="accent-yellow-500"
                />
                <p className='text-white text-bold'>Savings</p>
              </label>
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" onClick={handleAddAccountSubmit} className="px-4 py-2 bg-yellow-500 text-gray-900 font-semibold rounded hover:bg-yellow-600 transition-colors">Add</button>
            <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-600 text-gray-200 font-semibold rounded hover:bg-gray-700 transition-colors">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-fixed min-w-full text-sm text-gray-300">
            <thead>
              <tr className="bg-gray-700/60">
                <th className="px-4 py-2 text-left font-semibold w-1/4">Account Name</th>
                <th className="px-4 py-2 text-left font-semibold w-1/4">Account Number</th>
                <th className="px-4 py-2 text-left font-semibold w-1/4">Balance</th>
                <th className="px-4 py-2 text-left font-semibold w-1/4">Type</th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full text-sm text-gray-300">
              <tbody>
                {currentAccounts && currentAccounts.map((account) => (
                  <tr key={account.account_id} className={rowStyle}>
                    <td className={`px-4 py-2 ${accountTypeStyle}`}>{`${accountUser} ${account.account_type} Account`}</td>
                    <td className={`px-4 py-2 ${accountNumberStyle}`}>{account.account_id}</td>
                    <td className={`px-4 py-2 ${balanceStyle}`}>${Number(account.balance).toFixed(2)}</td>
                    <td className={`px-4 py-2 ${accountTypeStyle}`}>{account.account_type} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table