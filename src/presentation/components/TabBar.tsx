import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

export type AppTab = "home" | "dashboard" | "library" | "tasks" | "profile";

interface Props {
  currentTab: AppTab;
  onChangeTab: (tab: AppTab) => void;
}

export function TabBar({ currentTab, onChangeTab }: Props) {
  const theme = useCognitiveTheme();
  const tabs: Array<{ key: AppTab; label: string; icon: React.ComponentProps<typeof MaterialIcons>["name"] }> = [
    { key: "home", label: "Home", icon: "home" },
    { key: "dashboard", label: "Painel", icon: "dashboard" },
    { key: "library", label: "Plataforma", icon: "language" },
    { key: "tasks", label: "Tarefas", icon: "assignment" },
    { key: "profile", label: "Perfil", icon: "person" }
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.color.appBar, borderColor: theme.color.border }]}>
      {tabs.map((tab) => {
        const active = currentTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChangeTab(tab.key)}
            style={[
              styles.item,
              {
                backgroundColor: active ? "rgba(255, 255, 255, 0.2)" : "transparent",
                borderRadius: theme.radius
              }
            ]}
          >
            <MaterialIcons
              name={tab.icon}
              size={16}
              color={active ? "#FFFFFF" : theme.color.appBarText}
              style={{ marginBottom: 2 }}
            />
            <Text
              style={{
                color: active ? "#FFFFFF" : theme.color.appBarText,
                fontSize: theme.text.smallSize - 1,
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
    padding: 10,
    borderTopWidth: 1
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10
  }
});
