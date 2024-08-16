"use client";

import { useSession } from "next-auth/react";
import Container from "./components/container";
import SideMenu from "./components/side-menu";
import App from "./components/app";
import WelcomeScreen from "./components/welcome-screen";
import Footer from "./components/footer";
import { useState } from "react";

export default function Home() {
  const [showBankForm, setShowBankForm] = useState(false);

  const { data } = useSession();

  return (
    <Container>
      <SideMenu setShowBankForm={setShowBankForm} />

      {data?.user ? (
        <App showBankForm={showBankForm} setShowBankForm={setShowBankForm} />
      ) : (
        <WelcomeScreen />
      )}

      <Footer />
    </Container>
  );
}
