import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import Loader from './components/Loader/Loader.jsx';
import CustomCursor from './components/CustomCursor/CustomCursor.jsx';
import useSmoothScroll from './hooks/useSmoothScroll.js';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Home />
    </>
  );
}

export default App;
