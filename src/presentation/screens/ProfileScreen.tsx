import React from "react";
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useSettings } from "../context/SettingsContext";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

const neurodivergenceOptions = ["TDAH", "TEA", "Dislexia", "Ansiedade", "Burnout", "Sobrecarga Sensorial", "Outro"];

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
  const initials = (settings.profileName || "U").slice(0, 1).toUpperCase();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize, fontWeight: "700" }}>
        Perfil do Usuário
      </Text>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize }}>
        Gerencie suas informações e preferências pessoais.
      </Text>

      <Card>
        <View style={{ alignItems: "center", marginBottom: 16 }}>
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: theme.color.primary,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10
            }}
          >
            <Text style={{ color: "#fff", fontSize: 36, fontWeight: "700" }}>{initials}</Text>
          </View>
          <Text style={{ color: theme.color.text, fontWeight: "700", fontSize: theme.text.bodySize + 2 }}>
            {settings.profileName}
          </Text>
          <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>{settings.profileEmail}</Text>
        </View>

        <SectionTitle>Dados pessoais</SectionTitle>
        <TextInput
          value={settings.profileName}
          onChangeText={(value) => updateSettings({ profileName: value })}
          placeholder="Nome"
          placeholderTextColor={theme.color.muted}
          style={{
            borderWidth: 1,
            borderColor: theme.color.border,
            borderRadius: 8,
            padding: 10,
            color: theme.color.text,
            marginBottom: 8
          }}
        />
        <TextInput
          value={settings.profileEmail}
          onChangeText={(value) => updateSettings({ profileEmail: value })}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor={theme.color.muted}
          style={{
            borderWidth: 1,
            borderColor: theme.color.border,
            borderRadius: 8,
            padding: 10,
            color: theme.color.text
          }}
        />
      </Card>

      <Card>
        <SectionTitle>Neurodivergências</SectionTitle>
        <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize, marginBottom: 8 }}>
          Identifique suas necessidades para personalizar melhor sua experiência.
        </Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          {neurodivergenceOptions.map((option) => {
            const selected = settings.neurodivergences.includes(option);
            return (
              <Pressable
                key={option}
                onPress={() =>
                  updateSettings({
                    neurodivergences: selected
                      ? settings.neurodivergences.filter((item) => item !== option)
                      : [...settings.neurodivergences, option]
                  })
                }
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: selected ? theme.color.primary : theme.color.border,
                  backgroundColor: selected ? theme.color.primary : theme.color.card
                }}
              >
                <Text style={{ color: selected ? "#fff" : theme.color.text, fontSize: theme.text.smallSize }}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </Card>

      <Card>
        <SectionTitle>Preferencias visuais</SectionTitle>
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
        <SwitchRow
          label="Modo escuro"
          value={settings.themeMode === "dark"}
          onChange={(value) => updateSettings({ themeMode: value ? "dark" : "light" })}
        />
      </Card>

      <Card>
        <SectionTitle>Rotina de Estudo</SectionTitle>
        <Text style={{ color: theme.color.text, marginBottom: 6 }}>Período preferido</Text>
        <OptionsRow
          options={[
            { value: "morning", label: "Manhã" },
            { value: "afternoon", label: "Tarde" },
            { value: "evening", label: "Noite" },
            { value: "night", label: "Madrugada" }
          ]}
          value={settings.preferredStudyTime}
          onChange={(value) => updateSettings({ preferredStudyTime: value as any })}
        />

        <Text style={{ color: theme.color.text, marginTop: 12, marginBottom: 6 }}>Técnica de foco</Text>
        <OptionsRow
          options={[
            { value: "pomodoro", label: "Pomodoro" },
            { value: "custom", label: "Personalizado" },
            { value: "flexible", label: "Flexível" }
          ]}
          value={settings.focusTechnique}
          onChange={(value) => updateSettings({ focusTechnique: value as any })}
        />

        <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.color.text, marginBottom: 6 }}>Sessão (min)</Text>
            <TextInput
              value={String(settings.sessionDuration)}
              onChangeText={(value) => updateSettings({ sessionDuration: Math.max(5, Number(value) || 25) })}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: theme.color.border,
                borderRadius: 8,
                padding: 10,
                color: theme.color.text
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.color.text, marginBottom: 6 }}>Pausa (min)</Text>
            <TextInput
              value={String(settings.breakDuration)}
              onChangeText={(value) => updateSettings({ breakDuration: Math.max(1, Number(value) || 5) })}
              keyboardType="numeric"
              style={{
                borderWidth: 1,
                borderColor: theme.color.border,
                borderRadius: 8,
                padding: 10,
                color: theme.color.text
              }}
            />
          </View>
        </View>
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
        <SectionTitle>Necessidades específicas</SectionTitle>
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

      <Card style={{ backgroundColor: theme.color.primary }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons name="local-cafe" size={30} color="#fff" />
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#fff", fontSize: theme.text.bodySize, fontWeight: "700" }}>Lembre-se de fazer pausas!</Text>
            <Text style={{ color: "#fff", marginTop: 4, fontSize: theme.text.smallSize }}>
              Seu bem-estar é fundamental para produtividade sustentável.
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}

function OptionsRow({
  options,
  value,
  onChange
}: {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
}) {
  const theme = useCognitiveTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: active ? theme.color.primary : theme.color.border,
              backgroundColor: active ? theme.color.primary : theme.color.card
            }}
          >
            <Text style={{ color: active ? "#fff" : theme.color.text, fontSize: theme.text.smallSize }}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
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
