import React from "react";
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useSettings } from "../context/SettingsContext";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

function NumberAdjuster({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  const theme = useCognitiveTheme();
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: theme.color.text, marginBottom: 6 }}>
        {label}: {value.toFixed(1)}
      </Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Pressable
          onPress={() => onChange(Math.max(min, value - step))}
          style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: theme.color.border }}
        >
          <Text style={{ color: theme.color.text }}>-</Text>
        </Pressable>
        <Pressable
          onPress={() => onChange(Math.min(max, value + step))}
          style={{ paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: theme.color.border }}
        >
          <Text style={{ color: theme.color.text }}>+</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function ProfileScreen() {
  const { settings, updateSettings } = useSettings();
  const theme = useCognitiveTheme();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize, fontWeight: "700" }}>
        Perfil e Configuracoes
      </Text>

      <Card>
        <SectionTitle>Preferencias persistentes</SectionTitle>
        <NumberAdjuster
          label="Contraste"
          value={settings.contrastLevel}
          min={1}
          max={1.6}
          step={0.1}
          onChange={(value) => updateSettings({ contrastLevel: value })}
        />
        <NumberAdjuster
          label="Espacamento"
          value={settings.spacingLevel}
          min={0.8}
          max={1.6}
          step={0.1}
          onChange={(value) => updateSettings({ spacingLevel: value })}
        />
        <NumberAdjuster
          label="Tamanho da fonte"
          value={settings.fontScale}
          min={0.9}
          max={1.6}
          step={0.1}
          onChange={(value) => updateSettings({ fontScale: value })}
        />
      </Card>

      <Card>
        <SectionTitle>Recursos cognitivos</SectionTitle>
        <SwitchRow
          label="Alertas cognitivos"
          value={settings.cognitiveAlerts}
          onChange={(value) => updateSettings({ cognitiveAlerts: value })}
        />
        <SwitchRow
          label="Reduzir animacoes"
          value={settings.reduceAnimations}
          onChange={(value) => updateSettings({ reduceAnimations: value })}
        />
      </Card>

      <Card>
        <SectionTitle>Necessidades especificas</SectionTitle>
        <TextInput
          value={settings.specificNeeds}
          onChangeText={(value) => updateSettings({ specificNeeds: value })}
          placeholder="Ex.: evitar sobrecarga sensorial no periodo da manha"
          placeholderTextColor={theme.color.muted}
          multiline
          style={{
            borderWidth: 1,
            borderColor: theme.color.border,
            borderRadius: 8,
            padding: 10,
            color: theme.color.text,
            minHeight: 70,
            marginBottom: 10
          }}
        />
        <TextInput
          value={settings.studyRoutine}
          onChangeText={(value) => updateSettings({ studyRoutine: value })}
          placeholder="Rotina de estudo/trabalho (horarios e pausas)"
          placeholderTextColor={theme.color.muted}
          multiline
          style={{
            borderWidth: 1,
            borderColor: theme.color.border,
            borderRadius: 8,
            padding: 10,
            color: theme.color.text,
            minHeight: 70
          }}
        />
      </Card>
    </ScrollView>
  );
}

function SwitchRow({
  label,
  value,
  onChange
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const theme = useCognitiveTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
      <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>{label}</Text>
      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}
