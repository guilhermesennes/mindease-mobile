import React from "react";
import { Text } from "react-native";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

export function SectionTitle({ children }: { children: React.ReactNode }) {
  const theme = useCognitiveTheme();

  return (
    <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize + 1, fontWeight: "700", marginBottom: 10 }}>
      {children}
    </Text>
  );
}
