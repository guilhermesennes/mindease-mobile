import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";
import { useSettings } from "../context/SettingsContext";
import { AppTab } from "../components/TabBar";

export function HomeScreen({ onNavigate }: { onNavigate: (tab: AppTab) => void }) {
  const theme = useCognitiveTheme();
  const { settings } = useSettings();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Card style={{ alignItems: "center" }}>
        <MaterialIcons name="psychology" size={72} color={theme.color.primary} />
        <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize + 12, fontWeight: "700", marginTop: 8 }}>
          MindEase
        </Text>
        <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize + 1, marginTop: 4 }}>
          Plataforma de Acessibilidade Cognitiva
        </Text>
        <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize, marginTop: 10, textAlign: "center" }}>
          Desenvolvida para facilitar a vida acadêmica e profissional de pessoas neurodivergentes e com desafios de
          processamento cognitivo.
        </Text>
      </Card>

      <Card>
        <SectionTitle>Módulos principais</SectionTitle>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <FeatureCard icon="language" title="Plataforma" description="Explore ferramentas e recursos" onPress={() => onNavigate("library")} />
          <FeatureCard icon="assignment" title="Organizador" description="Kanban e timer Pomodoro" onPress={() => onNavigate("tasks")} />
          <FeatureCard icon="dashboard" title="Painel Cognitivo" description="Ajuste sua interface" onPress={() => onNavigate("dashboard")} />
          <FeatureCard icon="person" title="Perfil" description="Preferências e rotina" onPress={() => onNavigate("profile")} />
        </View>
      </Card>

      <Card style={{ backgroundColor: theme.color.primary }}>
        <SectionTitle>🎯 Recursos Principais</SectionTitle>
        <ResourceRow icon="dashboard" title="Interface Personalizável" subtitle="Ajuste complexidade, contraste, fonte e espaçamento" />
        <ResourceRow icon="assignment" title="Gestão Cognitiva de Tarefas" subtitle="Kanban visual com checklist e timer Pomodoro" />
        <ResourceRow icon="psychology" title="Alertas Cognitivos" subtitle="Notificações inteligentes e mensagens de incentivo" />
        <ResourceRow icon="schedule" title="Modo Foco" subtitle="Reduza distrações e mantenha a concentração" />
      </Card>

      {settings.complexityLevel === "detailed" ? (
        <Card style={{ backgroundColor: theme.color.info }}>
          <SectionTitle>🧠 Suporte para Neurodivergências</SectionTitle>
          <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>
            TDAH • TEA (Autismo) • Dislexia • Burnout • Ansiedade • Sobrecarga Sensorial
          </Text>
          <Pressable
            onPress={() => onNavigate("profile")}
            style={{
              marginTop: 12,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              alignSelf: "flex-start",
              backgroundColor: "#fff"
            }}
          >
            <Text style={{ color: theme.color.info, fontWeight: "700", fontSize: theme.text.smallSize }}>Configure seu Perfil</Text>
          </Pressable>
        </Card>
      ) : null}
    </ScrollView>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  onPress
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  description: string;
  onPress: () => void;
}) {
  const theme = useCognitiveTheme();
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexBasis: "48%",
        minWidth: 145,
        borderWidth: 1,
        borderColor: theme.color.border,
        borderRadius: 10,
        padding: 10,
        backgroundColor: theme.color.card
      }}
    >
      <MaterialIcons name={icon} size={30} color={theme.color.primary} />
      <Text style={{ color: theme.color.text, fontWeight: "700", fontSize: theme.text.smallSize, marginTop: 6 }}>{title}</Text>
      <Text style={{ color: theme.color.muted, marginTop: 4, fontSize: theme.text.smallSize }}>{description}</Text>
    </Pressable>
  );
}

function ResourceRow({
  icon,
  title,
  subtitle
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  title: string;
  subtitle: string;
}) {
  const theme = useCognitiveTheme();

  return (
    <View style={{ flexDirection: "row", gap: 8, marginTop: 10, alignItems: "center" }}>
      <MaterialIcons name={icon} size={20} color="#fff" />
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: theme.text.smallSize }}>{title}</Text>
        <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>{subtitle}</Text>
      </View>
    </View>
  );
}
