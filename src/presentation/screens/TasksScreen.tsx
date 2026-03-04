import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../components/Card";
import { SectionTitle } from "../components/SectionTitle";
import { useTasks } from "../context/TasksContext";
import { useSettings } from "../context/SettingsContext";
import { Task, TaskStatus } from "../../domain/entities/Task";
import { useCognitiveTheme } from "../theme/useCognitiveTheme";

const adaptedPomodoroSeconds = 1 * 60;

export function TasksScreen() {
  const { tasks, createTask, moveTask, toggleChecklistItem, addChecklistItem, removeChecklistItem, removeTask } =
    useTasks();
  const { settings } = useSettings();
  const theme = useCognitiveTheme();
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(adaptedPomodoroSeconds);
  const [running, setRunning] = useState(false);
  const [transitionHint, setTransitionHint] = useState("");

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = setInterval(() => {
      setTimerSeconds((value) => {
        if (value <= 1) {
          setRunning(false);
          setTransitionHint("Transicao suave: respire por 1 minuto e mude de atividade sem pressa.");
          return adaptedPomodoroSeconds;
        }
        return value - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [running]);

  const columns = useMemo(
    () => [
      {
        status: "todo" as TaskStatus,
        label: "A iniciar",
        color: settings.complexityLevel === "detailed"
          ? theme.settings.themeMode === "dark"
            ? "#888888"
            : "#666666"
          : "#ed6c02"
      },
      {
        status: "doing" as TaskStatus,
        label: "Em foco",
        color: settings.complexityLevel === "detailed"
          ? theme.settings.themeMode === "dark"
            ? "#999999"
            : "#555555"
          : "#0288d1"
      },
      {
        status: "done" as TaskStatus,
        label: "Concluido",
        color: settings.complexityLevel === "detailed"
          ? theme.settings.themeMode === "dark"
            ? "#aaaaaa"
            : "#444444"
          : "#2e7d32"
      }
    ],
    [settings.complexityLevel, theme.settings.themeMode]
  );

  const displayTasks = settings.complexityLevel === "simple" ? tasks.slice(0, 5) : tasks;

  const submitTask = async () => {
    if (!title.trim()) {
      return;
    }
    await createTask({
      title: title.trim(),
      notes: notes.trim(),
      estimatedFocusMinutes: 25
    });
    setTitle("");
    setNotes("");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.color.bg }}
      contentContainerStyle={{ gap: theme.spacing, padding: theme.spacing }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.titleSize + 8, fontWeight: "700" }}>
        Organizador de Tarefas
      </Text>
      <Text style={{ color: theme.color.muted, fontSize: theme.text.bodySize }}>
        Gerencie suas atividades com suporte cognitivo.
      </Text>

      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Pressable
          onPress={() => setView("kanban")}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: view === "kanban" ? theme.color.primary : theme.color.border,
            backgroundColor: view === "kanban" ? theme.color.primary : theme.color.card
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MaterialIcons name="view-column" size={16} color={view === "kanban" ? "#fff" : theme.color.text} />
            <Text style={{ color: view === "kanban" ? "#fff" : theme.color.text }}>Kanban</Text>
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

      <Card>
        <SectionTitle>Pomodoro adaptado</SectionTitle>
        <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize }}>
          {String(Math.floor(timerSeconds / 60)).padStart(2, "0")}:{String(timerSeconds % 60).padStart(2, "0")}
        </Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 10 }}>
          <Pressable
            onPress={() => setRunning((v) => !v)}
            style={{ padding: 10, borderRadius: 8, backgroundColor: theme.color.primary }}
          >
            <Text style={{ color: "#FFF" }}>{running ? "Pausar" : "Iniciar foco"}</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setRunning(false);
              setTimerSeconds(adaptedPomodoroSeconds);
              setTransitionHint("");
            }}
            style={{ padding: 10, borderRadius: 8, borderWidth: 1, borderColor: theme.color.border }}
          >
            <Text style={{ color: theme.color.text }}>Reiniciar</Text>
          </Pressable>
        </View>
        {transitionHint ? (
          <Text style={{ marginTop: 10, color: theme.color.success, fontSize: theme.text.smallSize }}>
            {transitionHint}
          </Text>
        ) : null}
      </Card>

      {!settings.focusMode ? (
        <Card>
          <SectionTitle>Nova tarefa</SectionTitle>
          <TextInput
            placeholder="Titulo objetivo"
            placeholderTextColor={theme.color.muted}
            value={title}
            onChangeText={setTitle}
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
            placeholder="Contexto rapido (opcional)"
            placeholderTextColor={theme.color.muted}
            value={notes}
            onChangeText={setNotes}
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
          <Pressable
            onPress={submitTask}
            style={{
              marginTop: 10,
              backgroundColor: theme.color.primary,
              borderRadius: 8,
              alignItems: "center",
              paddingVertical: 10
            }}
          >
            <Text style={{ color: "#FFF", fontWeight: "600" }}>Adicionar</Text>
          </Pressable>
        </Card>
      ) : (
        <Card>
          <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>
            Modo foco ativo: formulario ocultado para reduzir estimulos.
          </Text>
        </Card>
      )}

      {view === "kanban"
        ? columns.map((column) => {
            const items = displayTasks.filter((task) => task.status === column.status);
            return (
              <Card key={column.status} style={{ borderTopColor: column.color }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <SectionTitle>{column.label}</SectionTitle>
                  <View
                    style={{
                      backgroundColor: column.color,
                      borderRadius: 999,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                      marginBottom: 8
                    }}
                  >
                    <Text style={{ color: "#fff", fontSize: theme.text.smallSize, fontWeight: "700" }}>{items.length}</Text>
                  </View>
                </View>
                {items.length === 0 ? (
                  <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Sem tarefas nesta etapa.</Text>
                ) : (
                  items.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      moveTask={moveTask}
                      toggleChecklistItem={toggleChecklistItem}
                      addChecklistItem={addChecklistItem}
                      removeChecklistItem={removeChecklistItem}
                      removeTask={removeTask}
                    />
                  ))
                )}
              </Card>
            );
          })
        : (
            <Card>
              <SectionTitle>Lista geral</SectionTitle>
              {displayTasks.length === 0 ? (
                <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Nenhuma tarefa criada ainda.</Text>
              ) : (
                displayTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    moveTask={moveTask}
                    toggleChecklistItem={toggleChecklistItem}
                    addChecklistItem={addChecklistItem}
                    removeChecklistItem={removeChecklistItem}
                    removeTask={removeTask}
                  />
                ))
              )}
            </Card>
          )}

      <Card style={{ backgroundColor: theme.color.info }}>
        <SectionTitle>Dicas para melhor produtividade</SectionTitle>
        <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>• Divida tarefas grandes em subtarefas menores</Text>
        <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>• Use o timer Pomodoro para manter o foco</Text>
        <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>• Priorize 3 tarefas principais por dia</Text>
        <Text style={{ color: "#fff", fontSize: theme.text.smallSize }}>• Faça pausas regulares para evitar sobrecarga</Text>
      </Card>
    </ScrollView>
  );
}

function TaskCard({
  task,
  moveTask,
  toggleChecklistItem,
  addChecklistItem,
  removeChecklistItem,
  removeTask
}: {
  task: Task;
  moveTask: (taskId: string, status: TaskStatus) => Promise<void>;
  toggleChecklistItem: (taskId: string, itemId: string) => Promise<void>;
  addChecklistItem: (taskId: string, text: string) => Promise<void>;
  removeChecklistItem: (taskId: string, itemId: string) => Promise<void>;
  removeTask: (taskId: string) => Promise<void>;
}) {
  const { settings } = useSettings();
  const theme = useCognitiveTheme();
  const [newSubtaskText, setNewSubtaskText] = useState("");

  const submitSubtask = async () => {
    await addChecklistItem(task.id, newSubtaskText);
    setNewSubtaskText("");
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.color.border,
        borderRadius: 10,
        padding: 10,
        marginBottom: 8
      }}
    >
      <Text style={{ color: theme.color.text, fontSize: theme.text.bodySize, fontWeight: "600" }}>{task.title}</Text>
      {settings.readingMode === "detailed" && !settings.focusMode && task.notes ? (
        <Text style={{ color: theme.color.muted, marginTop: 4 }}>{task.notes}</Text>
      ) : null}

      <Text style={{ color: theme.color.muted, marginTop: 8, fontSize: theme.text.smallSize }}>Checklist inteligente</Text>
      {task.checklist.map((item) => (
        <View key={item.id} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 5 }}>
          <Pressable
            onPress={() => toggleChecklistItem(task.id, item.id)}
            style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}
          >
            <Text style={{ color: item.done ? theme.color.success : theme.color.muted }}>{item.done ? "●" : "○"}</Text>
            <Text style={{ color: theme.color.text, fontSize: theme.text.smallSize }}>{item.text}</Text>
          </Pressable>
          <Pressable
            onPress={() => removeChecklistItem(task.id, item.id)}
            style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: theme.color.border }}
          >
            <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Remover</Text>
          </Pressable>
        </View>
      ))}

      {!settings.focusMode ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 }}>
          <TextInput
            placeholder="Nova subtarefa"
            placeholderTextColor={theme.color.muted}
            value={newSubtaskText}
            onChangeText={setNewSubtaskText}
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: theme.color.border,
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 8,
              color: theme.color.text
            }}
          />
          <Pressable
            onPress={submitSubtask}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 8,
              backgroundColor: theme.color.primary
            }}
          >
            <Text style={{ color: "#FFF", fontSize: theme.text.smallSize }}>Adicionar</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={{ flexDirection: "row", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
        {(["todo", "doing", "done"] as TaskStatus[]).map((status) => (
          <Pressable
            key={status}
            onPress={() => moveTask(task.id, status)}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: task.status === status ? theme.color.primary : theme.color.border,
              backgroundColor: task.status === status ? theme.color.primary : "transparent"
            }}
          >
            <Text style={{ color: task.status === status ? "#FFF" : theme.color.text, fontSize: theme.text.smallSize }}>
              {status === "todo" ? "A iniciar" : status === "doing" ? "Em foco" : "Concluido"}
            </Text>
          </Pressable>
        ))}
        <Pressable
          onPress={() => removeTask(task.id)}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.color.border
          }}
        >
          <Text style={{ color: theme.color.muted, fontSize: theme.text.smallSize }}>Excluir card</Text>
        </Pressable>
      </View>
    </View>
  );
}
