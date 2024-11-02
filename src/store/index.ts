import { create } from "zustand";

interface Task {
  id: string;
  content: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface BoardState {
  columns: Column[];
  selectedTaskId: string | null;
  isModalOpen: boolean;
  openModal: (taskId: string) => void;
  closeModal: () => void;
  deleteTask: (taskId: string, columnId: string) => void;
  moveTask: (taskId: string, sourceColId: string, targetColId: string) => void;
  addTask: (taskContent: string, tags: string[], columnId: string) => void;
}

const getInitialColumns = (): Column[] => {
  const savedColumns = localStorage.getItem("columns");
  return savedColumns
    ? JSON.parse(savedColumns)
    : [
        { id: "todo", title: "To Do", tasks: [] },
        { id: "doing", title: "Doing", tasks: [] },
        { id: "done", title: "Done", tasks: [] },
      ];
};

export const useBoardStore = create<BoardState>((set) => ({
  columns: getInitialColumns(),
  selectedTaskId: null,
  isModalOpen: false,
  openModal: (taskId) => set({ selectedTaskId: taskId, isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false, selectedTaskId: null }),
  deleteTask: (taskId, columnId) =>
    set((state) => {
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.tasks = column.tasks.filter((task) => task.id !== taskId);
        localStorage.setItem("columns", JSON.stringify(state.columns));
      }
      return { columns: [...state.columns] };
    }),
  moveTask: (taskId, sourceColId, targetColId) =>
    set((state) => {
      const sourceColumn = state.columns.find((col) => col.id === sourceColId);
      const targetColumn = state.columns.find((col) => col.id === targetColId);
      if (!sourceColumn || !targetColumn) return state;

      const task = sourceColumn.tasks.find((task) => task.id === taskId);
      if (!task) return state;

      sourceColumn.tasks = sourceColumn.tasks.filter((t) => t.id !== taskId);
      targetColumn.tasks = [...targetColumn.tasks, task];
      localStorage.setItem("columns", JSON.stringify(state.columns));

      return { columns: [...state.columns] };
    }),
  addTask: (taskContent, tags, columnId) =>
    set((state) => {
      const newTask: Task = {
        id: String(Date.now()),
        content: taskContent,
        tags,
      };
      const column = state.columns.find((col) => col.id === columnId);
      if (column) {
        column.tasks = [...column.tasks, newTask];
        localStorage.setItem("columns", JSON.stringify(state.columns));
      }
      return { columns: [...state.columns] };
    }),
}));
