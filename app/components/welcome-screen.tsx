import { MoveRightIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function WelcomeScreen() {
  const handleLogInClick = () => signIn("google");

  return (
    <div className="flex w-full flex-col justify-between gap-5 border-x border-solid border-white border-opacity-10 p-5 xl:min-w-[600px] xl:max-w-[600px]">
      <div className="flex flex-col gap-5">
        <div className="flex w-full items-center gap-5">
          <h1 className="text-nowrap text-2xl font-bold md:text-3xl">
            Financial Control
          </h1>

          <hr className="w-full border border-solid border-primary" />
        </div>

        <p className="text-sm text-white text-opacity-50">
          O seu aliado na gestão eficiente das suas finanças. Aqui, você pode
          acompanhar suas entradas e saídas financeiras com facilidade e
          precisão. Comece a gerenciar seu dinheiro de forma inteligente hoje
          mesmo!
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-20 md:flex-row md:px-10 xl:justify-between">
        <div className="flex w-full flex-col items-center gap-2.5 text-5xl font-bold text-primary md:items-start">
          <p>Gerencie</p>
          <p>Suas</p>
          <p>Finanças</p>
        </div>

        <Image
          src="/logo.jpeg"
          alt="Logo"
          height={1024}
          width={1024}
          className="h-40 w-40 rounded-full"
        />
      </div>

      <div className="flex flex-col gap-5">
        <p className="text-sm">
          Faça login para acessar a aplicação e gerenciar suas finanças com
          facilidade. O objetivo aqui é ajudar você a manter suas finanças sob
          controle.
        </p>

        <button
          onClick={handleLogInClick}
          className="flex items-center justify-between rounded-lg bg-primary px-5 py-2.5 active:bg-gray-400"
        >
          Fazer login
          <MoveRightIcon size={16} />
        </button>
      </div>
    </div>
  );
}
