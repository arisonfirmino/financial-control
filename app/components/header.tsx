import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data } = useSession();
  const handleSignOutClick = () => signOut();

  return (
    <header className="flex items-center gap-5">
      <h3 className="text-nowrap text-xl font-bold">{data?.user?.name}</h3>

      <hr className="w-full border border-solid border-white border-opacity-10" />

      <button
        onClick={handleSignOutClick}
        className="flex active:text-red-600 xl:hidden"
      >
        <LogOutIcon size={18} />
      </button>
    </header>
  );
}
