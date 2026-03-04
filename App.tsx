import React, { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SettingsProvider, useSettings } from "./src/presentation/context/SettingsContext";
import { TasksProvider, useTasks } from "./src/presentation/context/TasksContext";
import { AppTab, TabBar } from "./src/presentation/components/TabBar";
import { DashboardScreen } from "./src/presentation/screens/DashboardScreen";
import { HomeScreen } from "./src/presentation/screens/HomeScreen";
import { LibraryScreen } from "./src/presentation/screens/LibraryScreen";
import { TasksScreen } from "./src/presentation/screens/TasksScreen";
import { ProfileScreen } from "./src/presentation/screens/ProfileScreen";
import { useCognitiveTheme } from "./src/presentation/theme/useCognitiveTheme";

const TABLET_MAX_WIDTH = 900;
const APP_BAR_HEIGHT = 64;
const APP_BAR_ICON_BUTTON = 48;

function AppContent() {
  const [tab, setTab] = useState<AppTab>("home");
  const { loading, settings, updateSettings } = useSettings();
  const { tasks } = useTasks();
  const theme = useCognitiveTheme();

  const doingCount = tasks.filter((task) => task.status === "doing").length;

  const screen = useMemo(() => {
    switch (tab) {
      case "home":
        return <HomeScreen onNavigate={setTab} />;
      case "dashboard":
        return <DashboardScreen onNavigate={setTab} />;
      case "library":
        return <LibraryScreen />;
      case "tasks":
        return <TasksScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return null;
    }
  }, [tab]);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.bg, alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "100%", maxWidth: TABLET_MAX_WIDTH, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={theme.color.primary} />
          <Text style={{ color: theme.color.text, marginTop: 8 }}>Carregando preferencias...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <StatusBar barStyle={theme.settings.themeMode === "dark" ? "light-content" : "dark-content"} />
      <ExpoStatusBar style={theme.settings.themeMode === "dark" ? "light" : "dark"} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ width: "100%", maxWidth: TABLET_MAX_WIDTH, flex: 1 }}>
          <View
            style={{
              backgroundColor: theme.color.appBar,
              borderBottomWidth: 1,
              borderBottomColor: theme.settings.themeMode === "dark" ? "#2a2a2a" : "rgba(255,255,255,0.2)",
              paddingHorizontal: 16,
              height: APP_BAR_HEIGHT,
              justifyContent: "center"
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <View>
                <Text style={{ color: theme.color.appBarText, fontWeight: "500", fontSize: 20, lineHeight: 24 }}>Hackathon FIAP</Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <Pressable
                  onPress={() => setTab("tasks")}
                  style={{
                    borderRadius: 999,
                    width: APP_BAR_ICON_BUTTON,
                    height: APP_BAR_ICON_BUTTON,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.12)"
                  }}
                >
                  <MaterialIcons name="calendar-today" size={24} color={theme.color.appBarText} />
                </Pressable>

                <Pressable
                  onPress={() => updateSettings({ themeMode: settings.themeMode === "dark" ? "light" : "dark" })}
                  style={{
                    borderRadius: 999,
                    width: APP_BAR_ICON_BUTTON,
                    height: APP_BAR_ICON_BUTTON,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(255,255,255,0.12)"
                  }}
                >
                  <MaterialIcons
                    name={settings.themeMode === "dark" ? "brightness-7" : "brightness-4"}
                    size={24}
                    color={theme.color.appBarText}
                  />
                </Pressable>
              </View>
            </View>
          </View>

          {settings.cognitiveAlerts ? (
            <View
              style={{
                backgroundColor: theme.color.warning,
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: theme.color.border
              }}
            >
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}>
                {doingCount > 0
                  ? `Alertas cognitivos: você está com ${doingCount} tarefa(s) em foco. Faça pausas curtas.`
                  : "Alertas cognitivos ativos: mantenha um ritmo leve e previsível nas próximas tarefas."}
              </Text>
            </View>
          ) : null}

          <View style={{ flex: 1 }}>{screen}</View>
          <TabBar currentTab={tab} onChangeTab={setTab} />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <TasksProvider>
        <AppContent />
      </TasksProvider>
    </SettingsProvider>
  );
}
