"use client";
import React from "react";
import { useBoardStore } from "@/store";
import { useDraggable } from "@dnd-kit/core";

interface TaskProps {
  id: string;
  content: string;
  tags: string[];
  columnId: string;
}

const Draggable = ({ id, content, tags, columnId }: TaskProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { columnId }, // Include the columnId in the draggable data
  });
  const openModal = useBoardStore((state) => state.openModal);

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    padding: "0.5rem",
    margin: "0.5rem 0",
    backgroundColor: "lightblue",
    borderRadius: "4px",
    cursor: "grab",
    textAlign: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div>{content}</div>
      <div style={{ fontSize: "0.8rem", color: "gray" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              marginRight: "4px",
              padding: "2px 4px",
              backgroundColor: "#eee",
              borderRadius: "4px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <button
        onClick={() => openModal(id)}
        style={{
          marginTop: "0.5rem",
          color: "white",
          backgroundColor: "red",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Draggable;
