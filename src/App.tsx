import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import Feedback from "./components/Feedback";
import Home from "./components/Home";
import NewDrawing from "./components/NewDrawing";

function App() {
  return (
    <div className="App">
      <title>DSM</title>
      <div onClick={() => (window.location.href = "/")} className="header">
        <h1>Drawing social media</h1>
      </div>
      <div className="content">
        <Router>
          <Routes>
            <Route path="novyObrazek" element={<NewDrawing />}></Route>
            <Route path="/feedback" element={<Feedback />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
