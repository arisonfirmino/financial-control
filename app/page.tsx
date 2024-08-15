"use client";

import { useSession } from "next-auth/react";
import Container from "./components/container";
import SideMenu from "./components/side-menu";
import App from "./components/app";
import WelcomeScreen from "./components/welcome-screen";
import Footer from "./components/footer";

export default function Home() {
  const { data } = useSession();

  return (
    <Container>
      <SideMenu />

      {data?.user ? <App /> : <WelcomeScreen />}

      <Footer />
    </Container>
  );
}
