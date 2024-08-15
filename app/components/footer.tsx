import { CopyrightIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="hidden w-full flex-col items-center justify-between p-5 xl:flex">
      <h2 className="text-lg font-bold">Financial Control</h2>

      <p className="flex items-center gap-1 text-xs font-light text-white text-opacity-10">
        <CopyrightIcon size={10} />
        2024 Arison. All Rights Reserved
      </p>
    </footer>
  );
}
