import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../../domain/entities/Task";
import { TaskRepository } from "../../domain/repositories/TaskRepository";
import { STORAGE_KEYS } from "../storage/storageKeys";

export class AsyncStorageTaskRepository implements TaskRepository {
  async list(): Promise<Task[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.tasks);
    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw) as Task[];
    } catch {
      return [];
    }
  }

  async saveAll(tasks: Task[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasks));
  }
}
