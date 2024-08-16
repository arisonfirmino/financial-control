import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { LandmarkIcon } from "lucide-react";
import Account from "./account";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import AddNewBankForm from "./bank-form";

interface Bank {
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

interface BankAccountsProps {
  showBankForm: boolean;
  setShowBankForm: (value: boolean) => void;
}

export default function BankAccounts({
  showBankForm,
  setShowBankForm,
}: BankAccountsProps) {
  const { data } = useSession();

  const [banks, setBanks] = useState<Bank[]>([]);

  const findBanks = useCallback(async () => {
    const response = await axios.get(
      "https://api-financial-control.onrender.com/banks",
    );
    const filteredBanks = response.data.filter(
      (bank: Bank) => bank.email === data?.user?.email,
    );
    setBanks(filteredBanks);
    console.log(filteredBanks);
  }, [data?.user?.email]);

  useEffect(() => {
    findBanks();
  }, [findBanks]);

  return (
    <section className="flex flex-col gap-5">
      <h3 className="flex items-center gap-1.5 text-lg font-bold uppercase">
        <LandmarkIcon size={18} />
        Contas
      </h3>

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
