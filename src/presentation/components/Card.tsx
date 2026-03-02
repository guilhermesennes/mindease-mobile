import React from "react";
import { View, ViewProps } from "react-native";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

export function Card(props: ViewProps) {
  const theme = useCognitiveTheme();

  return (
    <View
      {...props}
      style={[
        {
          backgroundColor: theme.color.card,
          borderColor: theme.color.border,
          borderWidth: 1,
          borderRadius: theme.radius,
          padding: theme.spacing
        },
        props.style
      ]}
    />
  );
}
