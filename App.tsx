import React, { useMemo, useState } from "react";
import { ActivityIndicator, SafeAreaView, StatusBar, Text, View } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { SettingsProvider, useSettings } from "./src/presentation/context/SettingsContext";
import { TasksProvider } from "./src/presentation/context/TasksContext";
import { AppTab, TabBar } from "./src/presentation/components/TabBar";
import { DashboardScreen } from "./src/presentation/screens/DashboardScreen";
import { LibraryScreen } from "./src/presentation/screens/LibraryScreen";
import { TasksScreen } from "./src/presentation/screens/TasksScreen";
import { ProfileScreen } from "./src/presentation/screens/ProfileScreen";
import { useCognitiveTheme } from "./src/presentation/theme/useCognitiveTheme";

function AppContent() {
  const [tab, setTab] = useState<AppTab>("dashboard");
  const { loading } = useSettings();
  const theme = useCognitiveTheme();

  const screen = useMemo(() => {
    switch (tab) {
      case "dashboard":
        return <DashboardScreen />;
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
        <ActivityIndicator color={theme.color.primary} />
        <Text style={{ color: theme.color.text, marginTop: 8 }}>Carregando preferencias...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.color.bg }}>
      <StatusBar barStyle={theme.color.bg === "#0B0C10" ? "light-content" : "dark-content"} />
      <ExpoStatusBar style={theme.color.bg === "#0B0C10" ? "light" : "dark"} />
      <View style={{ flex: 1 }}>{screen}</View>
      <TabBar currentTab={tab} onChangeTab={setTab} />
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
