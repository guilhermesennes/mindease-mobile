import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  CognitiveSettings,
  defaultCognitiveSettings
} from "../../domain/entities/CognitiveSettings";
import { SettingsRepository } from "../../domain/repositories/SettingsRepository";
import { STORAGE_KEYS } from "../storage/storageKeys";

export class AsyncStorageSettingsRepository implements SettingsRepository {
  async get(): Promise<CognitiveSettings> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.settings);
    if (!raw) {
      return defaultCognitiveSettings;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<CognitiveSettings>;
      return {
        ...defaultCognitiveSettings,
        ...parsed
      };
    } catch {
      return defaultCognitiveSettings;
    }
  }

  async save(settings: CognitiveSettings): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }
}
