import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type AccountType = "coach" | "athlete";

export default function SignupScreen() {
  const [accountType, setAccountType] =
    useState<AccountType>("athlete");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        EXPLORE FORGD
      </Text>

      <Text style={styles.subtitle}>
        BUILD YOUR LEGACY.
      </Text>

      <Text style={styles.question}>
        HOW WILL YOU TRAIN?
      </Text>

      {/* COACH SELECTION */}
      <Pressable
        onPress={() => setAccountType("coach")}
        style={[
          styles.card,
          accountType === "coach" && styles.selectedCard,
        ]}
      >
        <Text style={styles.cardTitle}>COACH</Text>

        <Text style={styles.cardDescription}>
          Build your coaching business.
        </Text>
      </Pressable>

      {/* ATHLETE SELECTION */}
      <Pressable
        onPress={() => setAccountType("athlete")}
        style={[
          styles.card,
          accountType === "athlete" && styles.selectedCard,
        ]}
      >
        <Text style={styles.cardTitle}>ATHLETE</Text>

        <Text style={styles.cardDescription}>
          Find a coach and start training.
        </Text>
      </Pressable>

      <Pressable
  style={styles.continueButton}
  onPress={() =>
    router.push({
      pathname: "/register",
      params: { role: accountType },
    })
  }
>
  <Text style={styles.continueText}>
    CONTINUE →
  </Text>
</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0b",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    color: "#ffffff",
    fontSize: 36,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: "#aaaaaa",
    fontSize: 13,
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  question: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#131a1a",
    borderColor: "#303939",
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
  },

  selectedCard: {
    backgroundColor: "#122520",
    borderColor: "#41e6b4",
  },

  cardTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
  },

  cardDescription: {
    color: "#aaaaaa",
    fontSize: 14,
    marginTop: 8,
  },

  continueButton: {
    backgroundColor: "#41e6b4",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 24,
  },

  continueText: {
    color: "#080b0b",
    fontSize: 16,
    fontWeight: "bold",
  },
});
