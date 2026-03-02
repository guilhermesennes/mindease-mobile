import React from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSettings } from "../context/SettingsContext";
import { useTasks } from "../context/TasksContext";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";
import { ComplexityLevel, ReadingMode } from "../../domain/entities/CognitiveSettings";

function OptionChips<T extends string>({
  value,
  options,
  onSelect
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onSelect: (value: T) => void;
}) {
  const theme = useCognitiveTheme();
  return (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: active ? theme.color.primary : theme.color.border,
              backgroundColor: active ? theme.color.primary : theme.color.card,
              borderRadius: 999
            }}
          >
            <Text style={{ color: active ? "#FFF" : theme.color.text }}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function DashboardScreen() {
  const { settings, updateSettings } = useSettings();
  const { tasks } = useTasks();
  const theme = useCognitiveTheme();

  const doing = tasks.filter((task) => task.status === "doing").length;
  const done = tasks.filter((task) => task.status === "done").length;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize, fontWeight: "700" }}>MindEase</Text>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize }}>
        Painel cognitivo personalizavel com foco, resumo e previsibilidade da interface.
      </Text>

      <Card>
        <SectionTitle>Estado rapido</SectionTitle>
        <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>
          Em foco agora: {doing} tarefa(s) | Finalizadas: {done}
        </Text>
        {settings.cognitiveAlerts ? (
          <Text style={{ color: theme.color.warning, marginTop: 8, fontSize: theme.text.smallSize }}>
            Alerta cognitivo: faca uma pausa curta a cada 25 minutos de foco.
          </Text>
        ) : null}
      </Card>

      <Card>
        <SectionTitle>Nivel de complexidade</SectionTitle>
        <OptionChips<ComplexityLevel>
          value={settings.complexityLevel}
          options={[
            { value: "simple", label: "Simples" },
            { value: "balanced", label: "Balanceado" },
            { value: "detailed", label: "Detalhado" }
          ]}
          onSelect={(value) => updateSettings({ complexityLevel: value })}
        />
      </Card>

      <Card>
        <SectionTitle>Leitura e foco</SectionTitle>
        <OptionChips<ReadingMode>
          value={settings.readingMode}
          options={[
            { value: "summary", label: "Modo resumo" },
            { value: "detailed", label: "Modo detalhado" }
          ]}
          onSelect={(value) => updateSettings({ readingMode: value })}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
          <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>Modo de foco</Text>
          <Switch value={settings.focusMode} onValueChange={(value) => updateSettings({ focusMode: value })} />
        </View>
      </Card>

      <Card>
        <SectionTitle>Conforto visual</SectionTitle>
        <Text style={{ color: theme.color.muted, marginBottom: 8, fontSize: theme.text.smallSize }}>
          Contraste: {settings.contrastLevel.toFixed(1)} | Espacamento: {settings.spacingLevel.toFixed(1)} | Fonte:{" "}
          {settings.fontScale.toFixed(1)}x
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => updateSettings({ contrastLevel: Math.max(1, settings.contrastLevel - 0.1) })}
            style={{ padding: 10, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>- Contraste</Text>
          </Pressable>
          <Pressable
            onPress={() => updateSettings({ contrastLevel: Math.min(1.6, settings.contrastLevel + 0.1) })}
            style={{ padding: 10, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>+ Contraste</Text>
          </Pressable>
        </View>
      </Card>
    </ScrollView>
  );
}
