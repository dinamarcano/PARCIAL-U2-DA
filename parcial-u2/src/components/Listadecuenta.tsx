import React from "react";
import AccountCard from "./Cuentacard";

export default function AccountList({ accounts, onDeposit, onWithdraw, formatMoney }) {
  return (
    <div>
      {accounts.map((acc) => (
        <AccountCard
          key={acc.id}
          account={acc}
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
          formatMoney={formatMoney}
        />
      ))}
    </div>
  );
}
