export type TaskStatus = "todo" | "doing" | "done";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  notes: string;
  status: TaskStatus;
  checklist: ChecklistItem[];
  estimatedFocusMinutes: number;
  createdAt: string;
}
