import React from "react";
import { createRoot } from "react-dom/client";
import A from "./App";
import "./index.css";

// Create a root for rendering
const root = createRoot(document.querySelector('.root'));

// Render your main component
root.render(<A />);
