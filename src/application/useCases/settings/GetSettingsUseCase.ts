import { CognitiveSettings } from "../../../domain/entities/CognitiveSettings";
import { SettingsRepository } from "../../../domain/repositories/SettingsRepository";

export class GetSettingsUseCase {
  constructor(private readonly settingsRepository: SettingsRepository) {}

  async execute(): Promise<CognitiveSettings> {
    return this.settingsRepository.get();
  }
}
