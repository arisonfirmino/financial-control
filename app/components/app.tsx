import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BankAccounts from "./bank-accounts";
import ExpenseButton from "./expense-button";
import Expenses from "./expenses";
import Header from "./header";
import IncomeButton from "./income-button";
import Incomes from "./incomes";
import IncomeForm from "./income-form";
import axios from "axios";
import ExpenseForm from "./expense-form";
import TotalValue from "./total-value";

interface AppProps {
  showBankForm: boolean;
  setShowBankForm: (value: boolean) => void;
}

export interface Bank {
  id: string;
  name: string;
  email: string;
  initial_value: number;
  current_value: number;
  expenses: number;
  incomes: number;
  created_at: string;
  updated_at: string;
}

export interface Income {
  id: string;
  name: string;
  email: string;
  value: number;
  created_at: string;
  bank: Bank;
}

export interface Expense {
  id: string;
  name: string;
  email: string;
  value: number;
  created_at: string;
  bank: Bank;
}

export default function App({ showBankForm, setShowBankForm }: AppProps) {
  const { data } = useSession();

  const [banks, setBanks] = useState<Bank[]>([]);

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const findBanks = useCallback(async () => {
    const response = await axios.get(
      "https://api-financial-control.onrender.com/banks",
    );
    const filteredBanks = response.data.filter(
      (bank: Bank) => bank.email === data?.user?.email,
    );
    setBanks(filteredBanks);
  }, [data?.user?.email]);

  const findIncomes = useCallback(async () => {
    const response = await axios.get(
      "https://api-financial-control.onrender.com/incomes",
    );
    const filteredBanks = response.data.filter(
      (income: Income) => income.email === data?.user?.email,
    );
    setIncomes(filteredBanks);
  }, [data?.user?.email]);

  const findExpenses = useCallback(async () => {
    const response = await axios.get(
      "https://api-financial-control.onrender.com/expenses",
    );
    const filteredBanks = response.data.filter(
      (expense: Expense) => expense.email === data?.user?.email,
    );
    setExpenses(filteredBanks);
  }, [data?.user?.email]);

  useEffect(() => {
    findBanks();
    findIncomes();
    findExpenses();
  }, [findBanks, findIncomes, findExpenses]);

  return (
    <div className="flex w-full flex-col gap-5 border-x border-solid border-white border-opacity-10 p-5 xl:min-w-[600px] xl:max-w-[600px]">
      <Header />

      <TotalValue banks={banks} />

      <div className="flex items-center justify-center gap-5">
        <hr className="hidden w-full border border-solid border-white border-opacity-10 md:flex" />

        <IncomeButton setShowIncomeForm={setShowIncomeForm} />
        <ExpenseButton setShowExpenseForm={setShowExpenseForm} />
      </div>

      <BankAccounts
        banks={banks}
        findBanks={findBanks}
        showBankForm={showBankForm}
        setShowBankForm={setShowBankForm}
      />

      <div className="flex gap-5 overflow-auto [&::-webkit-scrollbar]:hidden">
        <Incomes incomes={incomes} />
        <Expenses expenses={expenses} />
      </div>

      {showIncomeForm && (
        <IncomeForm
          handleClick={() => setShowIncomeForm(false)}
          findIncomes={findIncomes}
          updateBanks={findBanks}
        />
      )}

      {showExpenseForm && (
        <ExpenseForm
          handleClick={() => setShowExpenseForm(false)}
          findExpenses={findExpenses}
          updateBanks={findBanks}
        />
      )}
    </div>
  );
}
