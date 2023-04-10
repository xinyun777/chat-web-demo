import "./App.css";
import React from "react";
import Chat from "./pages/chatTemplate";
import ChatDome from './pages/chat-gpt-dome'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header >
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/chatTemplate" element={<Chat />} />
            <Route path="/chat-gpt-dome" element={<ChatDome />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
