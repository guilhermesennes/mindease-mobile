import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

export type AppTab = "dashboard" | "library" | "tasks" | "profile";

interface Props {
  currentTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
}

export function TabBar({ currentTab, onChangeTab }: Props) {
  const theme = useCognitiveTheme();
  const tabs: Array<{ key: AppTab; label: string }> = [
    { key: "dashboard", label: "Painel" },
    { key: "library", label: "Biblioteca" },
    { key: "tasks", label: "Tarefas" },
    { key: "profile", label: "Perfil" }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.color.card, borderColor: theme.color.border }]}>
      {tabs.map((tab) => {
        const active = currentTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChangeTab(tab.key)}
            style={[
              styles.item,
              {
                backgroundColor: active ? theme.color.primary : "transparent",
                borderRadius: theme.radius
              }
            ]}
          >
            <Text
              style={{
                color: active ? "#FFFFFF" : theme.color.text,
                fontSize: theme.text.smallSize,
                fontWeight: "600"
              }}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    padding: 8,
    borderTopWidth: 1
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  }
});
