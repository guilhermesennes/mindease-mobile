import { Task } from "../entities/Task";

export interface TaskRepository {
  list(): Promise<Task[]>;
  saveAll(tasks: Task[]): Promise<void>;
}
