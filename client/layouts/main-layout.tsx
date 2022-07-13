import React, { useState } from "react";
import Navbar from "../components/ui/navbar";
import Player from "../components/ui/player";
import TrackModalModule from "../components/ui/track-modal";
interface LayoutInterface {
  children: React.ReactNode;
}
const MainLayout: React.FC<LayoutInterface> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Player />
    </>
  );
};

export default MainLayout;
