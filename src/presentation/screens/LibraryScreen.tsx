import React from "react";
import { ScrollView, Text } from "react-native";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useSettings } from "../context/SettingsContext";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

const content = [
  {
    title: "Planejamento de estudo",
    summary: "Quebre o objetivo em blocos de 25 minutos com pausas curtas.",
    detailed:
      "Defina um objetivo pequeno para cada bloco. Use checklist visual e confirme a proxima acao antes de iniciar o timer."
  },
  {
    title: "Reducao de sobrecarga",
    summary: "Mantenha apenas uma tarefa visivel por vez.",
    detailed:
      "Evite alternancia frequente entre telas. Sempre finalize um passo antes de abrir uma nova atividade para preservar foco."
  },
  {
    title: "Comunicacao clara",
    summary: "Prefira frases curtas e acao objetiva.",
    detailed:
      "Mensagens diretas com linguagem simples reduzem ansiedade e evitam ambiguidade em momentos de alta carga mental."
  }
];

export function LibraryScreen() {
  const { settings } = useSettings();
  const theme = useCognitiveTheme();

  const visibleContent = settings.complexityLevel === "simple" ? content.slice(0, 2) : content;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize, fontWeight: "700" }}>
        Biblioteca Cognitiva
      </Text>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize }}>
        Conteudo orientado por ritmo guiado e leitura adaptada.
      </Text>

      {visibleContent.map((item) => (
        <Card key={item.title}>
          <SectionTitle>{item.title}</SectionTitle>
          <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>
            {settings.readingMode === "summary" ? item.summary : item.detailed}
          </Text>
        </Card>
      ))}
    </ScrollView>
  );
}
