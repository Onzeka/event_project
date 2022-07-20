import React, { useEffect, useState } from "react";

//Routing 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Contexts
import ApiProvider from "./contexts/ApiProvider";

//Components
import Header from "./components/Header";


// Styles
import { GlobalStyle } from "./GlobalStyle";

//pages
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router>
      <ApiProvider>
        <Header/>
        <Routes>
          <Route path="/" element={<Feed/>}/>
          <Route path="/explore" element={<Explore/>}/>
        </Routes>
        <GlobalStyle/>
      </ApiProvider>
    </Router>
  );
}

export default App;
