import { LandmarkIcon, PlusIcon } from "lucide-react";
import Account from "./account";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import AddNewBankForm from "./bank-form";
import { Bank } from "./app";

interface BankAccountsProps {
  banks: Bank[];
  findBanks: () => void;
  showBankForm: boolean;
  setShowBankForm: (value: boolean) => void;
}

export default function BankAccounts({
  banks,
  findBanks,
  showBankForm,
  setShowBankForm,
}: BankAccountsProps) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 text-lg font-bold uppercase">
          <LandmarkIcon size={18} />
          Contas
        </h3>

        <button
          onClick={() => setShowBankForm(true)}
          className="text-primary active:text-gray-400 xl:hidden"
        >
          <PlusIcon size={18} />
        </button>
      </div>

      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        className="w-full cursor-grab active:cursor-grabbing"
      >
        {banks.map((bank) => (
          <SwiperSlide key={bank.id}>
            <Account
              id={bank.id}
              name={bank.name}
              initial_value={bank.initial_value}
              expenses={bank.expenses}
              incomes={bank.incomes}
              current_value={bank.current_value}
              updateBanks={findBanks}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {showBankForm && (
        <AddNewBankForm
          handleClick={() => setShowBankForm(false)}
          updateBanks={findBanks}
        />
      )}
    </section>
  );
}
