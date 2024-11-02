"use client";
import React from "react";
import Board from "./_components/Board";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Kanban Board</h1>
      <Board />
    </div>
  );
};

export default App;
