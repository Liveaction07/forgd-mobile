
import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { supabase } from "../lib/supabase";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    Keyboard.dismiss();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      if (!data.session) {
        setError("Unable to establish a session.");
        return;
      }

      // Temporary routing based on registration metadata.
      // Later we will retrieve the role from PostgreSQL.
      const accountType =
        data.user?.user_metadata?.account_type;

      if (accountType === "coach") {
        router.replace("/coach-dashboard");
      } else if (accountType === "athlete") {
        router.replace("/athlete-dashboard");
      } else {
        setError("Account type not found. Contact support.");
      }
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.logo}>FORGD</Text>

        <Text style={styles.tagline}>BUILT, NOT BORN.</Text>

        <Text style={styles.title}>WELCOME BACK</Text>

        <View style={styles.form}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#8b9595"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />

          <Text style={styles.label}>PASSWORD</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#8b9595"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="current-password"
          />

          {error !== "" && (
            <Text style={styles.errorText} accessibilityRole="alert">
              {error}
            </Text>
          )}

          <Pressable
            style={[styles.loginButton, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "SIGNING IN..." : "LOG IN →"}
            </Text>
          </Pressable>

          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}>
              NEW TO FORGD? CREATE ACCOUNT
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0b",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
    paddingBottom: 60,
  },
  logo: {
    color: "#ffffff",
    fontSize: 48,
    fontWeight: "900",
    textAlign: "center",
  },
  tagline: {
    color: "#41e6b4",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 45,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
    marginBottom: 35,
  },
  form: {
    gap: 14,
  },
  label: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  input: {
    backgroundColor: "#131a1a",
    borderColor: "#303939",
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: "#ffffff",
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: "#41e6b4",
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#080b0b",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
  },
  signupText: {
    color: "#41e6b4",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 24,
  },
});
