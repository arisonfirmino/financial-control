"use client";

import { useState } from "react";
import { Bank, Expense, Income, User } from "@prisma/client";
import DataList from "./data-list";
import Nav from "./nav";
import TransactionHistory from "./transaction-history";

interface AppProps {
  user: User & {
    banks: (Bank & {
      incomes: Income[];
      expenses: Expense[];
    })[];
    incomes: (Income & { bank: Bank })[];
    expenses: (Expense & { bank: Bank })[];
  };
}

export default function App({ user }: AppProps) {
  const [showAddBank, setShowAddBank] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  return (
    <>
      <Nav
        showAddBank={showAddBank}
        setShowAddBank={setShowAddBank}
        showTransactionForm={showTransactionForm}
        setShowTransactionForm={setShowTransactionForm}
      />
      <div className="ml-20 grid grid-cols-2 gap-5 px-5 pt-5">
        <DataList
          user={user}
          showAddBank={showAddBank}
          setShowAddBank={setShowAddBank}
          showTransactionForm={showTransactionForm}
          setShowTransactionForm={setShowTransactionForm}
        />
        <TransactionHistory incomes={user.incomes} expenses={user.expenses} />
      </div>
    </>
  );
}
