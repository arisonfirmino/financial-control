"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  HomeIcon,
  LandmarkIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";

interface NavProps {
  showAddBank?: boolean;
  setShowAddBank?: (value: boolean) => void;
  showTransactionForm?: boolean;
  setShowTransactionForm?: (value: boolean) => void;
}

export default function Nav({
  showAddBank,
  setShowAddBank,
  showTransactionForm,
  setShowTransactionForm,
}: NavProps) {
  const { data } = useSession();

  const handleLogInClick = () => signIn("google");
  const handleSignOutClick = () => signOut();

  const [active, setActive] = useState(0);
  const nav_items = [
    { icon: <HomeIcon size={20} />, handleClick: undefined },
    { icon: <SearchIcon size={20} />, handleClick: undefined },
    {
      icon: <LandmarkIcon size={20} />,
      handleClick: () => setShowAddBank && setShowAddBank(!showAddBank),
    },
    {
      icon: <PlusIcon size={20} />,
      handleClick: () =>
        setShowTransactionForm && setShowTransactionForm(!showTransactionForm),
    },
  ];

  return (
    <nav className="fixed left-0 top-0 flex h-full flex-col justify-between border-r border-solid border-[#d4d4d4] border-opacity-10 bg-stroke p-5">
      <div className="flex flex-col gap-5">
        {nav_items.map((item, index) => (
          <button
            key={index}
            disabled={!data?.user}
            onClick={() => {
              item.handleClick && item.handleClick();
              setActive(index);
            }}
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background ${active === index ? "border border-solid border-foreground" : ""} ${!data?.user ? "cursor-not-allowed" : ""}`}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {data?.user ? (
        <button
          onClick={handleSignOutClick}
          className="flex h-10 w-10 items-center justify-center"
        >
          <Image
            src={data?.user.image ?? ""}
            alt={data?.user.name ?? ""}
            height={1024}
            width={1024}
            className="w-full rounded-full"
          />
        </button>
      ) : (
        <button
          onClick={handleLogInClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-solid border-foreground bg-main active:bg-background"
        >
          <UserIcon size={20} />
        </button>
      )}
    </nav>
  );
}
