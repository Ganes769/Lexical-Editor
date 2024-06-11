import "./styles.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import Editor from "./App.tsx";
import { TableContext } from "./plugins/TablePlugin.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div className="App">
      <h1>React.js Rich Text Lexical Example</h1>
      <TableContext>
        <Editor />
      </TableContext>
    </div>
  </React.StrictMode>
);
