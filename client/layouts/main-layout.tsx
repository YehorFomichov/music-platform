import React, { useState } from "react";
import Navbar from "../components/ui/navbar";
import Player from "../components/ui/player";
import TrackModalModule from "../components/ui/track-modal";
interface LayoutInterface {
  children: React.ReactNode;
}
const MainLayout: React.FC<LayoutInterface> = ({ children }) => {
  const [showNavBar, setShowNavBar] = useState(false);
  const handleToggleNavbar = () => {
    setTimeout(() => {
      document.body.scrollIntoView({ behavior: "smooth" });
    }, 10);
    setShowNavBar((prevState) => !prevState);
  };
  return (
    <>
      <Navbar showNavBar={showNavBar} onToggleNavbar={handleToggleNavbar} />
      {children}
      <Player />
    </>
  );
};

export default MainLayout;
