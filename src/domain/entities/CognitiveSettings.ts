export type ComplexityLevel = "simple" | "balanced" | "detailed";
export type ReadingMode = "summary" | "detailed";
export type ThemeMode = "light" | "dark";

export interface CognitiveSettings {
  themeMode: ThemeMode;
  profileName: string;
  profileEmail: string;
  neurodivergences: string[];
  preferredStudyTime: "morning" | "afternoon" | "evening" | "night";
  focusTechnique: "pomodoro" | "custom" | "flexible";
  sessionDuration: number;
  breakDuration: number;
  complexityLevel: ComplexityLevel;
  focusMode: boolean;
  readingMode: ReadingMode;
  contrastLevel: number;
  spacingLevel: number;
  fontScale: number;
  reduceAnimations: boolean;
  cognitiveAlerts: boolean;
  profileNavigationHint: string;
  specificNeeds: string;
  studyRoutine: string;
}

export const defaultCognitiveSettings: CognitiveSettings = {
  themeMode: "light",
  profileName: "Usuário",
  profileEmail: "usuario@fiap.com.br",
  neurodivergences: [],
  preferredStudyTime: "morning",
  focusTechnique: "pomodoro",
  sessionDuration: 25,
  breakDuration: 5,
  complexityLevel: "balanced",
  focusMode: false,
  readingMode: "summary",
  contrastLevel: 1,
  spacingLevel: 1,
  fontScale: 1,
  reduceAnimations: false,
  cognitiveAlerts: true,
  profileNavigationHint: "Navegacao guiada",
  specificNeeds: "",
  studyRoutine: ""
};
