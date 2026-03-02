import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { CognitiveSettings, defaultCognitiveSettings } from "../../domain/entities/CognitiveSettings";
import { container } from "../../core/di/container";

interface SettingsContextValue {
  settings: CognitiveSettings;
  loading: boolean;
  updateSettings: (patch: Partial<CognitiveSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<CognitiveSettings>(defaultCognitiveSettings);
  const [loading, setLoading] = useState(true);
  const settingsRef = useRef(settings);

  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  useEffect(() => {
    let mounted = true;
    container.getSettingsUseCase.execute().then((value) => {
      if (!mounted) {
        return;
      }
      setSettings(value);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const updateSettings = async (patch: Partial<CognitiveSettings>) => {
    const next = { ...settingsRef.current, ...patch };
    setSettings(next);
    await container.saveSettingsUseCase.execute(next);
  };

  const value = useMemo(
    () => ({
      settings,
      loading,
      updateSettings
    }),
    [settings, loading]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const value = useContext(SettingsContext);
  if (!value) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }
  return value;
}
