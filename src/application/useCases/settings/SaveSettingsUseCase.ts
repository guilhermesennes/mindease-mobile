import { CognitiveSettings } from "../../../domain/entities/CognitiveSettings";
import { SettingsRepository } from "../../../domain/repositories/SettingsRepository";

export class SaveSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(settings: CognitiveSettings): Promise<void> {
    await this.settingsRepository.save(settings);
  }
}
