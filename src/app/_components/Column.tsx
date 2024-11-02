"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { useBoardStore } from "@/store";
import Draggable from "./Draggable";
import { ColumnProps } from "@/types";

const Column = ({ id, title }: ColumnProps) => {
  const columns = useBoardStore((state) => state.columns);
  const { setNodeRef } = useDroppable({ id });

  const column = columns.find((col) => col.id === id);

  return (
    <div ref={setNodeRef} className="w-[20%] m-5">
      <h2 className="font-bold text-3xl">{title}</h2>
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
