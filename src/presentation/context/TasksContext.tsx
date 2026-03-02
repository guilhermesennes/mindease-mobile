import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Task, TaskStatus } from "../../domain/entities/Task";
import { container } from "../../core/di/container";

interface CreateTaskInput {
  title: string;
  notes: string;
  estimatedFocusMinutes: number;
}

interface TasksContextValue {
  tasks: Task[];
  loading: boolean;
  createTask: (input: CreateTaskInput) => Promise<void>;
  moveTask: (taskId: string, status: TaskStatus) => Promise<void>;
  toggleChecklistItem: (taskId: string, itemId: string) => Promise<void>;
  addChecklistItem: (taskId: string, text: string) => Promise<void>;
  removeChecklistItem: (taskId: string, itemId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    let mounted = true;
    container.listTasksUseCase.execute().then((value) => {
      if (!mounted) {
        return;
      }
      setTasks(value);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const save = async (next: Task[]) => {
    setTasks(next);
    await container.saveTasksUseCase.execute(next);
  };

  const createTask = async (input: CreateTaskInput) => {
    const nextTask: Task = {
      id: uid(),
      title: input.title,
      notes: input.notes,
      status: "todo",
      estimatedFocusMinutes: input.estimatedFocusMinutes,
      createdAt: new Date().toISOString(),
      checklist: [
        { id: uid(), text: "Definir proximo passo", done: false },
        { id: uid(), text: "Executar tarefa principal", done: false },
        { id: uid(), text: "Revisar e finalizar", done: false }
      ]
    };

    await save([nextTask, ...tasksRef.current]);
  };

  const moveTask = async (taskId: string, status: TaskStatus) => {
    const next = tasksRef.current.map((task) => (task.id === taskId ? { ...task, status } : task));
    await save(next);
  };

  const toggleChecklistItem = async (taskId: string, itemId: string) => {
    const next = tasksRef.current.map((task) =>
      task.id === taskId
        ? {
            ...task,
            checklist: task.checklist.map((item) =>
              item.id === itemId ? { ...item, done: !item.done } : item
            )
          }
        : task
    );
    await save(next);
  };

  const addChecklistItem = async (taskId: string, text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    const next = tasksRef.current.map((task) =>
      task.id === taskId
        ? {
            ...task,
            checklist: [...task.checklist, { id: uid(), text: trimmedText, done: false }]
          }
        : task
    );
    await save(next);
  };

  const removeChecklistItem = async (taskId: string, itemId: string) => {
    const next = tasksRef.current.map((task) =>
      task.id === taskId
        ? {
            ...task,
            checklist: task.checklist.filter((item) => item.id !== itemId)
          }
        : task
    );
    await save(next);
  };

  const removeTask = async (taskId: string) => {
    const next = tasksRef.current.filter((task) => task.id !== taskId);
    await save(next);
  };

  const value = useMemo(
    () => ({
      tasks,
      loading,
      createTask,
      moveTask,
      toggleChecklistItem,
      addChecklistItem,
      removeChecklistItem,
      removeTask
    }),
    [tasks, loading]
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const value = useContext(TasksContext);
  if (!value) {
    throw new Error("useTasks must be used inside TasksProvider");
  }
  return value;
}
