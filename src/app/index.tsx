
import { Redirect, useRouter } from "expo-router";
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";

export default function HomeScreen() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // Wait for Supabase to restore the existing session.
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#41e6b4" />
      </View>
    );
  }

  // If the user is already authenticated, redirect them.
  if (user) {
    const accountType = user.user_metadata?.account_type;

    if (accountType === "coach") {
      return <Redirect href="/coach-dashboard" />;
    }

    if (accountType === "athlete") {
      return <Redirect href="/athlete-dashboard" />;
    }
  }

  // Otherwise, show the normal welcome screen.
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FORGD</Text>

      <Text style={styles.slogan}>
        QUITTING IS NOT AN OPTION.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>GET STARTED</Text>
      </Pressable>

      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0b",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    fontSize: 56,
    fontWeight: "900",
    color: "#41e6b4",
  },
  slogan: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 16,
  },
  button: {
    marginTop: 40,
    backgroundColor: "#41e6b4",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    minWidth: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#080b0b",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginButton: {
    marginTop: 16,
    borderWidth: 2,
    borderColor: "#41e6b4",
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    minWidth: 220,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#41e6b4",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
