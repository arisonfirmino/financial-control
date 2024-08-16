import { HomeIcon, LandmarkIcon, SearchIcon, UserIcon } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface SideMenuProps {
  setShowBankForm: (value: boolean) => void;
}

export default function SideMenu({ setShowBankForm }: SideMenuProps) {
  const { data } = useSession();
  const handleLogInClick = () => signIn("google");
  const handleSignOutClick = () => signOut();

  const menuItems = [
    { name: "Home", icon: <HomeIcon size={20} /> },
    { name: "Search", icon: <SearchIcon size={20} /> },
    {
      name: "Bank",
      icon: <LandmarkIcon size={20} />,
      handleClick: () => setShowBankForm(true),
    },
  ];

  return (
    <nav className="hidden w-full flex-col items-end gap-5 p-5 xl:flex">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={item.handleClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-5 active:bg-gray-400 active:text-gray-600"
        >
          {item.icon}
        </button>
      ))}

      {data?.user ? (
        <button
          onClick={handleSignOutClick}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full"
        >
          <Image
            src={data.user.image ?? ""}
            alt={data.user.name ?? ""}
            height={1280}
            width={1280}
            className="w-full"
          />
        </button>
      ) : (
        <button
          onClick={handleLogInClick}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary active:bg-gray-400 active:text-gray-600"
        >
          <UserIcon size={20} />
        </button>
      )}
    </nav>
  );
}
