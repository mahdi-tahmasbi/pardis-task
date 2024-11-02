"use client";
import React, { useState } from "react";
import { useBoardStore } from "@/store";
import { tagsOptions } from "@/constants";

const TaskForm = () => {
  const addTask = useBoardStore((state) => state.addTask);
  const [taskContent, setTaskContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedColumnId, setSelectedColumnId] = useState("todo");

  const handleTagClick = (tag: string) => {
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
    <form
      onSubmit={handleSubmit}
      className="flex justify-center flex-col items-center"
    >
      <input
        type="text"
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        placeholder="Enter your Task"
        required
        className="w-[50%] px-2 py-2 border-gray-300 border-2 rounded-md "
      />
      <div className="flex justify-between w-[50%] items-center">
        <div className="flex flex-wrap gap-2 my-2">
          {tagsOptions.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`cursor-pointer px-2 py-1 border rounded-md transition-colors ${
                selectedTags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <select
            value={selectedColumnId}
            className="border-black border-2 px-5 py-2 rounded-md cursor-pointer"
            onChange={(e) => setSelectedColumnId(e.target.value)}
          >
            <option value="todo">To Do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
          <button
            type="submit"
            className="ml-2 bg-purple-600 text-white px-5 py-2 rounded-md hover:opacity-50 duration-200 active:opacity-100"
          >
            + Add Task
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
