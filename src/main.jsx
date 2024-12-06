import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./firebase.js";
import Login from "./Login.jsx";
import Dashboard from "./Dashboard.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/todo-list" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
