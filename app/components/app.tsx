import { useCallback, useEffect, useState } from "react";
import BankAccounts from "./bank-accounts";
import ExpenseButton from "./expense-button";
import Expenses from "./expenses";
import Header from "./header";
import IncomeButton from "./income-button";
import Incomes from "./incomes";
import IncomeForm from "./income-form";
import { useSession } from "next-auth/react";
import axios from "axios";
import ExpenseForm from "./expense-form";

interface AppProps {
  showBankForm: boolean;
  setShowBankForm: (value: boolean) => void;
}

interface Bank {
  id: string;
  name: string;
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

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

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
    findIncomes();
    findExpenses();
  }, [findIncomes, findExpenses]);

  return (
    <div className="flex h-full w-full flex-col gap-5 overflow-auto border-solid border-white border-opacity-10 p-5 xl:min-w-[600px] xl:max-w-[600px] xl:border-x [&::-webkit-scrollbar]:hidden">
      <Header />

      <div className="flex items-center justify-center gap-5">
        <hr className="hidden w-full border border-solid border-white border-opacity-10 md:flex" />

        <IncomeButton setShowIncomeForm={setShowIncomeForm} />
        <ExpenseButton setShowExpenseForm={setShowExpenseForm} />
      </div>

      <BankAccounts
        showBankForm={showBankForm}
        setShowBankForm={setShowBankForm}
      />

      <div className="flex gap-5">
        <Incomes incomes={incomes} />
        <Expenses expenses={expenses} />
      </div>

      {showIncomeForm && (
        <IncomeForm
          handleClick={() => setShowIncomeForm(false)}
          findIncomes={findIncomes}
        />
      )}

      {showExpenseForm && (
        <ExpenseForm
          handleClick={() => setShowExpenseForm(false)}
          findExpenses={findExpenses}
        />
      )}
    </div>
  );
}
