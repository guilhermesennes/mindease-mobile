import React from "react";
import { Text } from "react-native";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const theme = useCognitiveTheme();

  return (
    <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize, fontWeight: "700", marginBottom: 8 }}>
      {children}
    </Text>
  );
}
