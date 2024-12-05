import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./firebase.js";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo-list" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);
