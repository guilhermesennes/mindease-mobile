import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useSettings } from "../context/SettingsContext";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

const content = [
  {
    title: "Inteligência Artificial",
    summary: "Conheça ferramentas e recursos de IA para otimizar seu trabalho.",
    lessons: ["Aula 1: Introdução à IA", "Aula 2: Aprendizado Supervisionado", "Aula 3: Redes Neurais"],
    icon: "psychology"
  },
  {
    title: "Análise de Dados",
    summary: "Descubra insights poderosos através da análise de dados.",
    lessons: ["Aula 1: Estatística Básica", "Aula 2: Limpeza de Dados", "Aula 3: Visualização de Dados"],
    icon: "bar-chart"
  },
  {
    title: "Automação",
    summary: "Automatize processos e aumente sua produtividade.",
    lessons: ["Aula 1: RPA Conceitos", "Aula 2: Ferramentas de Automação", "Aula 3: Boas Práticas"],
    icon: "settings-suggest"
  },
  {
    title: "Cloud Computing",
    summary: "Aprenda sobre soluções em nuvem e arquitetura escalável.",
    lessons: ["Aula 1: Conceitos de Nuvem", "Aula 2: Serviços IaaS/PaaS/SaaS", "Aula 3: Arquitetura Escalável"],
    icon: "cloud"
  },
  {
    title: "DevOps",
    summary: "Melhore a integração e entrega contínua dos seus projetos.",
    lessons: ["Aula 1: Cultura DevOps", "Aula 2: CI/CD", "Aula 3: Observabilidade"],
    icon: "build"
  },
  {
    title: "Segurança",
    summary: "Proteja seus sistemas com as melhores práticas de segurança.",
    lessons: ["Aula 1: Fundamentos de Segurança", "Aula 2: Autenticação e Autorização", "Aula 3: Monitoramento"],
    icon: "security"
  }
] as const;

export function LibraryScreen() {
  const { settings } = useSettings();
  const theme = useCognitiveTheme();
  const [view, setView] = React.useState<"cards" | "list">("cards");
  const [selectedTopic, setSelectedTopic] = React.useState<(typeof content)[number] | null>(null);

  const visibleContent = settings.complexityLevel === "simple" ? content.slice(0, 2) : content;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialIcons name="language" size={36} color={theme.color.primary} />
          <View>
            <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize + 2, fontWeight: "700" }}>Plataforma</Text>
            <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Descubra novos recursos e funcionalidades</Text>
          </View>
        </View>
      </View>

      {!selectedTopic ? (
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            onPress={() => setView("cards")}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: view === "cards" ? theme.color.primary : theme.color.border,
              backgroundColor: view === "cards" ? theme.color.primary : theme.color.card
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <MaterialIcons name="view-module" size={16} color={view === "cards" ? "#fff" : theme.color.text} />
              <Text style={{ color: view === "cards" ? "#fff" : theme.color.text }}>Cards</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setView("list")}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: view === "list" ? theme.color.primary : theme.color.border,
              backgroundColor: view === "list" ? theme.color.primary : theme.color.card
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <MaterialIcons name="view-list" size={16} color={view === "list" ? "#fff" : theme.color.text} />
              <Text style={{ color: view === "list" ? "#fff" : theme.color.text }}>Lista</Text>
            </View>
          </Pressable>
        </View>
      ) : null}

      {selectedTopic ? (
        <Card>
          <Pressable onPress={() => setSelectedTopic(null)} style={{ marginBottom: 10 }}>
            <Text style={{ color: theme.color.primary, fontWeight: "600" }}>← Voltar</Text>
          </Pressable>
          <SectionTitle>{selectedTopic.title}</SectionTitle>
          <Text style={{ color: theme.color.text, marginBottom: 12 }}>{selectedTopic.summary}</Text>
          {selectedTopic.lessons.map((lesson) => (
            <View
              key={lesson}
              style={{
                borderWidth: 1,
                borderColor: theme.color.border,
                borderRadius: 8,
                padding: 10,
                marginBottom: 8
              }}
            >
              <Text style={{ color: theme.color.text, fontWeight: "600" }}>{lesson}</Text>
              <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Material e exercícios</Text>
              <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
                <Pressable
                  style={{
                    backgroundColor: theme.color.primary,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <MaterialIcons name="play-circle-outline" size={16} color="#fff" />
                  <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>Vídeo</Text>
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: theme.color.primary,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <MaterialIcons name="article" size={16} color="#fff" />
                  <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>Texto</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </Card>
      ) : view === "cards" ? (
        visibleContent.map((item) => (
          <Pressable key={item.title} onPress={() => setSelectedTopic(item)}>
            <Card>
              <MaterialIcons name={item.icon} size={28} color={theme.color.primary} style={{ marginBottom: 8 }} />
              <SectionTitle>{item.title}</SectionTitle>
              <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>{item.summary}</Text>
              <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize, marginTop: 6 }}>
                {item.lessons.length} aulas disponíveis
              </Text>
            </Card>
          </Pressable>
        ))
      ) : (
        <Card>
          <SectionTitle>Recursos disponíveis</SectionTitle>
          {visibleContent.map((item) => (
            <Pressable
              key={item.title}
              onPress={() => setSelectedTopic(item)}
              style={{
                borderBottomWidth: 1,
                borderBottomColor: theme.color.border,
                paddingVertical: 10
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <MaterialIcons name={item.icon} size={18} color={theme.color.primary} />
                <Text style={{ color: theme.color.text, fontWeight: "600" }}>{item.title}</Text>
              </View>
              <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>{item.summary}</Text>
            </Pressable>
          ))}
        </Card>
      )}
    </ScrollView>
  );
}
