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
    data: { columnId },
  });
  const openModal = useBoardStore((state) => state.openModal);

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : "none",
    padding: "1rem",
    margin: "0.5rem 0",
    borderRadius: "12px",
    cursor: "grab",
    border: "2px solid gray",
    textAlign: "start",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <h2 className="font-bold text-2xl">{content}</h2>
      <div className="flex justify-between mt-5">
        <div>
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
        <button onClick={() => openModal(id)}>🗑️</button>
      </div>
    </div>
  );
};

export default Draggable;
