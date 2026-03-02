import { Task } from "../../../domain/entities/Task";
import { TaskRepository } from "../../../domain/repositories/TaskRepository";

export class SaveTasksUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(tasks: Task[]): Promise<void> {
    await this.taskRepository.saveAll(tasks);
  }
}
