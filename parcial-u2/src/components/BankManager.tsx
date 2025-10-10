import React, { useEffect, useState } from "react";
import initialAccounts from "../data/cuentas.json";
import CreateAccountForm from "./Crearcuenta";
import AccountList from "./Listadecuenta";


function formatMoney(value) {
  return Number(value).toLocaleString("es-CO", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function BankManager() {
  const [accounts, setAccounts] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 
    setAccounts(initialAccounts.map((a) => ({ ...a })));
  }, []);

 
  useEffect(() => {
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [isDark]);

  function getNextId() {
    return accounts.length ? Math.max(...accounts.map((a) => a.id)) + 1 : 1001;
  }

  function handleCreateAccount(holderName, initialBalance) {
    const name = holderName?.trim();
    const bal = Number(initialBalance);
    if (!name) return { ok: false, message: "Ingrese el nombre del titular" };
    if (isNaN(bal) || bal < 0) return { ok: false, message: "Saldo inválido" };

    const newAcc = { id: getNextId(), holderName: name, balance: Number(bal.toFixed(2)) };
    setAccounts((p) => [...p, newAcc]);
    return { ok: true };
  }

  function handleDeposit(id, amount) {
    const a = accounts.find((x) => x.id === id);
    const amt = Number(amount);
    if (!a) return { ok: false, message: "Cuenta no encontrada" };
    if (isNaN(amt) || amt <= 0) return { ok: false, message: "Monto inválido" };

    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, balance: Number((acc.balance + amt).toFixed(2)) } : acc))
    );
    return { ok: true };
  }

  function handleWithdraw(id, amount) {
    const a = accounts.find((x) => x.id === id);
    const amt = Number(amount);
    if (!a) return { ok: false, message: "Cuenta no encontrada" };
    if (isNaN(amt) || amt <= 0) return { ok: false, message: "Monto inválido" };
    if (a.balance - amt < 0) return { ok: false, message: "Saldo insuficiente" };

    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, balance: Number((acc.balance - amt).toFixed(2)) } : acc))
    );
    return { ok: true };
  }

  function handleReset() {
    setAccounts(initialAccounts.map((a) => ({ ...a })));
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sistema Bancario Local</h1>
        <button
          onClick={() => setIsDark((d) => !d)}
          className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-sm"
        >
          {isDark ? "Modo claro" : "Modo Oscuro "}
        </button>
      </header>

    
      <div className="card border-t-4 border-blue-400 mb-6 p-4">
        <h2 className="font-semibold mb-3">Crear Nueva Cuenta</h2>
        <CreateAccountForm onCreate={handleCreateAccount} onReset={handleReset} />
      </div>

    
      <section className="mb-4">
        <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-t-md text-sm text-gray-700 dark:text-gray-200">
          <div className="col-span-2 font-medium">ID</div>
          <div className="col-span-6 font-medium">TITULAR</div>
          <div className="col-span-4 font-medium text-right">ACCIONES / SALDO</div>
        </div>

        <div className="divide-y">
          <AccountList
            accounts={accounts}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            formatMoney={formatMoney}
          />
        </div>
      </section>

      <footer className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
        
      </footer>
    </div>
  );
}
