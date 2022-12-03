import React, { useState, useRef, useEffect } from 'react';
import Home from './Home'
import Option from './Option'

function App() {

  const [selectedPage, setSelectedPage] = useState("home")

  const bc = new BroadcastChannel("home");
  bc.onmessage = (event) => {
    setSelectedPage("home")
  };

  const bc2 = new BroadcastChannel("option");
  bc2.onmessage = (event) => {
    setSelectedPage("option")
  };

  return (
    <>
      {selectedPage == "home" && <Home />}
      {selectedPage == "option" && <Option />}
    </>
  )
}

export default App;