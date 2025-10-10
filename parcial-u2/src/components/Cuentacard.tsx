import React, { useState } from "react";

export default function AccountCard({ account, onDeposit, onWithdraw, formatMoney }) {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  function handleDeposit() {
    setError("");
    const res = onDeposit(account.id, amount);
    if (!res.ok) setError(res.message);
    else setAmount("");
  }

  function handleWithdraw() {
    setError("");
    const res = onWithdraw(account.id, amount);
    if (!res.ok) setError(res.message);
    else setAmount("");
  }

  return (
    <div className="grid grid-cols-12 items-center px-4 py-4 bg-white dark:bg-gray-800">
      <div className="col-span-2 text-sm text-gray-700 dark:text-gray-200">{account.id}</div>
      <div className="col-span-6 text-gray-800 dark:text-gray-100">{account.holderName}</div>

      <div className="col-span-4">
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-300">Saldo:</div>
            <div className="text-green-600 dark:text-green-400 font-semibold">
              ${formatMoney(account.balance)}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-12 gap-2">
          <input
            className="col-span-8 p-2 border rounded-md bg-white dark:bg-gray-900"
            placeholder="Monto a operar"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            step="0.01"
            min="0"
          />
          <button onClick={handleDeposit} className="col-span-2 bg-blue-600 text-white rounded-md px-2">
            Consignar
          </button>
          <button onClick={handleWithdraw} className="col-span-2 bg-red-500 text-white rounded-md px-2">
            Retirar
          </button>
        </div>

        {error && <div className="text-sm text-red-500 mt-2">{error}</div>}
      </div>
    </div>
  );
}
