"use client";
import React from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import Modal from "./Modal";
import { DndContext } from "@dnd-kit/core";
import { useBoardStore } from "@/store";

const Board = () => {
  const columns = useBoardStore((state) => state.columns);
  const isModalOpen = useBoardStore((state) => state.isModalOpen);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      // Move the task to the new column
      const sourceColumnId = active.data.current.columnId;
      const targetColumnId = over.id;
      if (sourceColumnId !== targetColumnId) {
        useBoardStore
          .getState()
          .moveTask(active.id, sourceColumnId, targetColumnId);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <TaskForm />
      <div style={{ display: "flex" }}>
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title} />
        ))}
      </div>
      {isModalOpen && <Modal />}
    </DndContext>
  );
};

export default Board;
