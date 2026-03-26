import React from 'react'
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

function Table() {
    const rowStyle = "h-20 border-b items-center border-gray-700 hover:bg-gray-700/30 transition-colors";
    const balanceStyle = "font-semibold text-gray-200 text-lg";
    const accountTypeStyle = "text-sm text-gray-400";
    const accountNumberStyle = "mt-6 flex flex-row justify-center items-center text-sm text-gray-400";
    

  return (
    <div className="bg-gray-800/40 backdrop-blur-md p-8 rounded-lg shadow-md w-full max-w-5xl border-2 border-gray-700">
        <div className='flex flex-row items-center mb-6 gap-2'>
            <MdOutlineAccountBalanceWallet className="text-yellow-500 mr-2" size={30} />
            <h2 className="text-2xl font-bold text-gray-200 mb-0 text-start">Accounts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-300">
            <thead>
              <tr className="bg-gray-700/60">
                <th className="px-4 py-2 text-left font-semibold">Account Name</th>
                <th className="px-4 py-2 text-left font-semibold">Account Number</th>
                <th className="px-4 py-2 text-left font-semibold">Balance</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
              </tr>
            </thead>
          </table>
          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full text-sm text-gray-300">
              <tbody>
                {/* Example row, replace with dynamic data */}
                <tr className={rowStyle}>
                  <td className={`px-4 py-2 ${accountTypeStyle}`}>John Doe Checking</td>
                  <td className={`px-4 py-2 ${accountNumberStyle}`}>123456789</td>
                  <td className={`px-4 py-2 ${balanceStyle}`}>$5,000.00</td>
                  <td className={`px-4 py-2 ${accountTypeStyle}`}>Checking</td>
                </tr>
               
                {/* Add more rows dynamically here */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default Table