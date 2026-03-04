import { useMemo } from "react";
import { useSettings } from "../context/SettingsContext";

export function useCognitiveTheme() {
  const { settings } = useSettings();

  return useMemo(() => {
    const isDark = settings.themeMode === "dark";
    const monochrome = settings.complexityLevel === "detailed";
    const highContrast = settings.contrastLevel >= 1.4;
    const spacing = 12 * settings.spacingLevel;
    const titleSize = 22 * settings.fontScale;
    const bodySize = 15 * settings.fontScale;

    const primary = monochrome ? (isDark ? "#cccccc" : "#333333") : isDark ? "#ff00d0" : "#be0078cc";
    const secondary = monochrome ? (isDark ? "#999999" : "#666666") : isDark ? "#ff00d0" : "#dc004e";
    const success = monochrome ? (isDark ? "#aaaaaa" : "#444444") : isDark ? "#4caf50" : "#388e3c";
    const warning = monochrome ? (isDark ? "#999999" : "#555555") : isDark ? "#ff9800" : "#f57c00";
    const info = monochrome ? (isDark ? "#888888" : "#666666") : isDark ? "#2196f3" : "#1976d2";
    const bg = highContrast ? (isDark ? "#0B0C10" : "#F8F8F8") : isDark ? "#121212" : "#f5f5f5";
    const card = isDark ? "#1e1e1e" : "#ffffff";
    const appBar = monochrome ? (isDark ? "#1e1e1e" : "#333333") : isDark ? "#1e1e1e" : "#be0079";
    const appBarText = monochrome ? (isDark ? "#cccccc" : "#ffffff") : isDark ? "#ff00d0" : "#ffffff";
    const border = isDark ? "#333333" : "#E5E7EB";
    const muted = isDark ? "#A0AEC0" : "#6B7280";
    const text = isDark ? "#F5F5F5" : "#111827";

    return {
      settings,
      color: {
        bg,
        card,
        text,
        muted,
        primary,
        secondary,
        success,
        warning,
        info,
        border,
        appBar,
        appBarText
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
