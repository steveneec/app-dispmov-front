import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { questionGPT } from "../libs/services";
import theme from "../resources/theme-schema.json";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function GPT() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState<
    { owner: "user" | "chat"; message: string }[]
  >([]);

  async function onSendQuestion() {
    const _history = [...history];
    const _prompt = prompt;
    setPrompt("");
    _history.push({owner: "user", message: _prompt});
    const data = await questionGPT(_prompt);
    _history.push({owner: "chat", message: data.message.content});
    setHistory(_history);
  }


  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat GPT</Text>
        <Text style={styles.headerDescription}>Hazle una pregunta al Chat</Text>
      </View>
      <ScrollView style={styles.history} contentContainerStyle={{paddingVertical: 10}}>
        {history.map((his, key) => (
          <View
            style={[
              styles.message,
              { alignSelf: his.owner === "user" ? "flex-end" : "flex-start" },
            ]}
            key={key}
          >
            <Text style={styles.messageText}>{his.message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.prompt}>
        <TextInput
          placeholder="Message..."
          style={styles.input}
          value={prompt}
          onChangeText={(text) => setPrompt(text)}
        />
        <Pressable onPress={onSendQuestion}>
          <IonIcon name="send" size={32} color={theme.colors.accent} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    padding: 20,
  },
  headerTitle: {
    fontFamily: "Jakarta-Bold",
    fontSize: 32,
  },
  headerDescription: {
    fontFamily: "Jakarta-Regular",
    fontSize: 16,
  },
  input: {
    padding: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e2e2",
    paddingHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Jakarta-Regular",
    flex: 1,
  },
  prompt: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
  history: {
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
    borderRadius: 5,
    padding: 10,
  },
  message: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
  },
  messageText: {
    fontFamily: "Jakarta-Regular",
    fontSize: 16,
  },
});
