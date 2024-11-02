"use client";
import React, { useState } from "react";
import { useBoardStore } from "@/store";

const tagsOptions = ["TypeScript", "React", "Next.js", "Zustand", "JavaScript"];

const TaskForm = () => {
  const addTask = useBoardStore((state) => state.addTask);
  const [taskContent, setTaskContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState("todo");

  const handleTagChange = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskContent) {
      addTask(taskContent, selectedTags, selectedColumnId);
      setTaskContent("");
      setSelectedTags([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Task content"
        required
        style={{ marginRight: "0.5rem" }}
      />
      <select
        value={selectedColumnId}
        onChange={(e) => setSelectedColumnId(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      >
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
      <div>
        {tagsOptions.map((tag) => (
          <label key={tag} style={{ marginRight: "0.5rem" }}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagChange(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <button type="submit" style={{ marginTop: "0.5rem" }}>
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
