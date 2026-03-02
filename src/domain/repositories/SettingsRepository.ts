import { CognitiveSettings } from "../entities/CognitiveSettings";

export interface SettingsRepository {
  get(): Promise<CognitiveSettings>;
  save(settings: CognitiveSettings): Promise<void>;
}
