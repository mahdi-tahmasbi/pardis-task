"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useBoardStore } from "@/store";
import Draggable from "./Draggable";

interface ColumnProps {
  id: string;
  title: string;
}

const Column = ({ id, title }: ColumnProps) => {
  const columns = useBoardStore((state) => state.columns);
  const { setNodeRef } = useDroppable({ id });

  const column = columns.find((col) => col.id === id);

  return (
    <div
      ref={setNodeRef}
      style={{
        width: "300px",
        margin: "1rem",
        padding: "1rem",
        background: "#f0f0f0",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>
      {column?.tasks.map((task) => (
        <Draggable
          key={task.id}
          id={task.id}
          content={task.content}
          tags={task.tags}
          columnId={id}
        />
      ))}
    </div>
  );
};

export default Column;
