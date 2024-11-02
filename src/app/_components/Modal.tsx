"use client";
import React from "react";
import { useBoardStore } from "@/store";

const Modal = () => {
  const closeModal = useBoardStore((state) => state.closeModal);
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const selectedTaskId = useBoardStore((state) => state.selectedTaskId);
  const columns = useBoardStore((state) => state.columns);

  const column = columns.find((col) =>
    col.tasks.some((task) => task.id === selectedTaskId)
  );

  const handleDelete = () => {
    if (selectedTaskId && column) {
      deleteTask(selectedTaskId, column.id);
      closeModal();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
        }}
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this task?</p>
        <button onClick={handleDelete} style={{ marginRight: "1rem" }}>
          Yes
        </button>
        <button onClick={closeModal}>No</button>
      </div>
    </div>
  );
};

export default Modal;
