import { GetSettingsUseCase } from "../../application/useCases/settings/GetSettingsUseCase";
import { SaveSettingsUseCase } from "../../application/useCases/settings/SaveSettingsUseCase";
import { ListTasksUseCase } from "../../application/useCases/tasks/ListTasksUseCase";
import { SaveTasksUseCase } from "../../application/useCases/tasks/SaveTasksUseCase";
import { AsyncStorageSettingsRepository } from "../../infrastructure/repositories/AsyncStorageSettingsRepository";
import { AsyncStorageTaskRepository } from "../../infrastructure/repositories/AsyncStorageTaskRepository";

const settingsRepository = new AsyncStorageSettingsRepository();
const taskRepository = new AsyncStorageTaskRepository();

export const container = {
  getSettingsUseCase: new GetSettingsUseCase(settingsRepository),
  saveSettingsUseCase: new SaveSettingsUseCase(settingsRepository),
  listTasksUseCase: new ListTasksUseCase(taskRepository),
  saveTasksUseCase: new SaveTasksUseCase(taskRepository)
};
