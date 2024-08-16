import BankAccounts from "./bank-accounts";
import ExpenseButton from "./expense-button";
import Header from "./header";
import IncomeButton from "./income-button";

interface AppProps {
  showBankForm: boolean;
  setShowBankForm: (value: boolean) => void;
}

export default function App({ showBankForm, setShowBankForm }: AppProps) {
  return (
    <div className="flex min-h-screen w-full flex-col gap-5 border-solid border-white border-opacity-10 p-5 xl:min-w-[600px] xl:max-w-[600px] xl:border-x">
      <Header />

      <div className="flex items-center justify-center gap-5">
        <hr className="hidden w-full border border-solid border-white border-opacity-10 md:flex" />

        <IncomeButton />
        <ExpenseButton />
      </div>

      <BankAccounts
        showBankForm={showBankForm}
        setShowBankForm={setShowBankForm}
      />
    </div>
  );
}
