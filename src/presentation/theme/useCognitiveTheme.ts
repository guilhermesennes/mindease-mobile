import { useMemo } from "react";
import { useSettings } from "../context/SettingsContext";

export function useCognitiveTheme() {
  const { settings } = useSettings();

  return useMemo(() => {
    const highContrast = settings.contrastLevel >= 1.4;
    const spacing = 12 * settings.spacingLevel;
    const titleSize = 22 * settings.fontScale;
    const bodySize = 15 * settings.fontScale;

    return {
      settings,
      color: {
        bg: highContrast ? "#0B0C10" : "#F5F7FB",
        card: highContrast ? "#161B22" : "#FFFFFF",
        text: highContrast ? "#F8FAFC" : "#111827",
        muted: highContrast ? "#94A3B8" : "#6B7280",
        primary: "#2563EB",
        success: "#059669",
        warning: "#D97706",
        border: highContrast ? "#334155" : "#E5E7EB"
      },
      spacing,
      radius: 14,
      text: {
        titleSize,
        bodySize,
        smallSize: 13 * settings.fontScale
      }
    };
  }, [settings]);
}
