import React from "react";
import { Pressable, ScrollView, Switch, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSettings } from "../context/SettingsContext";
import { useTasks } from "../context/TasksContext";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";
import { ComplexityLevel, ReadingMode } from "../../domain/entities/CognitiveSettings";
import { AppTab } from "../components/TabBar";

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

export function DashboardScreen({ onNavigate }: { onNavigate: (tab: AppTab) => void }) {
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
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize + 8, fontWeight: "700" }}>Painel Cognitivo</Text>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize }}>
        Personalize sua experiencia para atender suas necessidades cognitivas.
      </Text>

      <Card>
        <Text style={{ color: theme.color.success, fontSize: theme.text.smallSize, fontWeight: "600" }}>
          Configuracoes salvas automaticamente e aplicadas em tempo real.
        </Text>
      </Card>

      <Card>
        <SectionTitle>
          <Text style={{ color: theme.color.text, fontWeight: "700" }}>Nível de Complexidade</Text>
        </SectionTitle>
        <RowTitle icon="text-fields" label="Complexidade da Interface" />
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
        <SectionTitle>Modos de Visualização</SectionTitle>
        <SwitchRow
          label="Modo foco"
          description="Esconde distracoes e destaca o conteudo principal"
          value={settings.focusMode}
          onChange={(value) => updateSettings({ focusMode: value })}
        />
        <SwitchRow
          label="Modo escuro"
          description="Reduz brilho e replica o tema do web"
          value={settings.themeMode === "dark"}
          onChange={(value) => updateSettings({ themeMode: value ? "dark" : "light" })}
        />
        <SwitchRow
          label="Alertas cognitivos"
          description="Ativa notificacoes de pausa e transicao"
          value={settings.cognitiveAlerts}
          onChange={(value) => updateSettings({ cognitiveAlerts: value })}
        />
      </Card>

      <Card>
        <SectionTitle>Leitura e Contraste</SectionTitle>
        <OptionChips<ReadingMode>
          value={settings.readingMode}
          options={[
            { value: "summary", label: "Modo resumo" },
            { value: "detailed", label: "Modo detalhado" }
          ]}
          onSelect={(value) => updateSettings({ readingMode: value })}
        />

        <Text style={{ color: theme.color.muted, marginTop: 12, marginBottom: 8, fontSize: theme.text.smallSize }}>
          Contraste: {settings.contrastLevel.toFixed(1)} | Fonte: {settings.fontScale.toFixed(1)}x
        </Text>
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          <Pressable
            onPress={() => updateSettings({ contrastLevel: Math.max(1, settings.contrastLevel - 0.1) })}
            style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>- Contraste</Text>
          </Pressable>
          <Pressable
            onPress={() => updateSettings({ contrastLevel: Math.min(1.6, settings.contrastLevel + 0.1) })}
            style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>+ Contraste</Text>
          </Pressable>
          <Pressable
            onPress={() => updateSettings({ fontScale: Math.max(0.9, settings.fontScale - 0.1) })}
            style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>- Fonte</Text>
          </Pressable>
          <Pressable
            onPress={() => updateSettings({ fontScale: Math.min(1.6, settings.fontScale + 0.1) })}
            style={{ paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: theme.color.border, borderRadius: 8 }}
          >
            <Text style={{ color: theme.color.text }}>+ Fonte</Text>
          </Pressable>
        </View>
      </Card>

      <Card style={{ backgroundColor: theme.color.info }}>
        <SectionTitle>Dica de foco</SectionTitle>
        <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>
          Em foco agora: {doing} tarefa(s) | Finalizadas: {done}
        </Text>
        <Text style={{ color: "#FFFFFF", marginTop: 6, fontSize: theme.text.smallSize }}>
          Faca pausas curtas a cada 25 minutos para reduzir sobrecarga cognitiva.
        </Text>
      </Card>

      <Card>
        <SectionTitle>Acessos rápidos</SectionTitle>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <FeatureShortcut icon="language" label="Plataforma" description="Conteúdos e trilhas" onPress={() => onNavigate("library")} />
          <FeatureShortcut icon="assignment" label="Tarefas" description="Kanban e pomodoro" onPress={() => onNavigate("tasks")} />
          <FeatureShortcut icon="person" label="Perfil" description="Preferências e rotina" onPress={() => onNavigate("profile")} />
        </View>
      </Card>
    </ScrollView>
  );
}

function RowTitle({ icon, label }: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string }) {
  const theme = useCognitiveTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 }}>
      <MaterialIcons name={icon} size={18} color={theme.color.primary} />
      <Text style={{ color: theme.color.text, fontSize: theme.text.smallSize }}>{label}</Text>
    </View>
  );
}

function FeatureShortcut({
  icon,
  label,
  description,
  onPress
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  description: string;
  onPress: () => void;
}) {
  const theme = useCognitiveTheme();

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexBasis: "48%",
        minWidth: 140,
        borderWidth: 1,
        borderColor: theme.color.border,
        borderRadius: 10,
        padding: 10,
        backgroundColor: theme.color.card
      }}
    >
      <MaterialIcons name={icon} size={18} color={theme.color.primary} style={{ marginBottom: 6 }} />
      <Text style={{ color: theme.color.text, fontWeight: "700", fontSize: theme.text.smallSize }}>{label}</Text>
      <Text style={{ color: theme.color.muted, marginTop: 4, fontSize: theme.text.smallSize }}>{description}</Text>
    </Pressable>
  );
}

function SwitchRow({
  label,
  description,
  value,
  onChange
}: {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  const theme = useCognitiveTheme();

  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>{label}</Text>
        <Switch value={value} onValueChange={onChange} />
      </View>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize, marginTop: 4 }}>{description}</Text>
    </View>
  );
}
