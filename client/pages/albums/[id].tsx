import React, { useEffect, useState } from "react";
import TracksPage from "../../components/pages/tracks-page";
import { useActions } from "../../hooks/useActions";

const Index = () => {
  const count = 10;
  const { loadTracks } = useActions();
  const [pageOffset, setPageOffset] = useState();
  useEffect(() => {
    loadTracks(count, pageOffset);
  }, [pageOffset]);
  return <TracksPage />;
};

export default Index;
