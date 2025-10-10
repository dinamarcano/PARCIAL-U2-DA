import React, { useState } from "react";

export default function CreateAccountForm({ onCreate, onReset }) {
  const [holder, setHolder] = useState("");
  const [balance, setBalance] = useState("0");
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");
    const res = onCreate(holder, balance);
    if (!res.ok) setError(res.message || "Error");
    else {
      setHolder("");
      setBalance("0");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-12 gap-3">
        <input
          className="col-span-8 p-2 border rounded-md bg-white dark:bg-gray-800"
          placeholder="Titular de la Cuenta"
          value={holder}
          onChange={(e) => setHolder(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          min="0"
          className="col-span-2 p-2 border rounded-md bg-white dark:bg-gray-800"
          placeholder="Saldo Inicial ($)"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />
        <button className="col-span-2 bg-green-600 text-white rounded-md px-3 py-2">Crear Cuenta</button>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={onReset} className="text-sm text-gray-600 dark:text-gray-300">
          Reset JSON
        </button>
        {error && <div className="text-sm text-red-500">{error}</div>}
      </div>
    </form>
  );
}
