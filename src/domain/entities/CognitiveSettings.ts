export type ComplexityLevel = "simple" | "balanced" | "detailed";
export type ReadingMode = "summary" | "detailed";

export interface CognitiveSettings {
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
