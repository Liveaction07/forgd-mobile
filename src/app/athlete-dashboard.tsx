
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function AthleteDashboard() {
  const router = useRouter();

  const { loading, user, signOut } = useAuth();

  // State for coach invitation
  const [inviteCode, setInviteCode] = useState("");
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [joining, setJoining] = useState(false);
  const [message, setMessage] = useState("");

  console.log("Auth loading:", loading);
  console.log("Auth user:", user?.email);

  // Existing logout functionality
  async function handleLogout() {
    try {
      await signOut();
      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Logout Failed",
        "Unable to sign out. Please try again."
      );
    }
  }

  // NEW: Redeem coach invitation
  async function handleJoinCoach() {
    const code = inviteCode.trim().toLowerCase();

    if (!code) {
      Alert.alert(
        "Missing Code",
        "Please enter your coach's invitation code."
      );
      return;
    }

    if (!user || joining) return;

    setJoining(true);
    setMessage("");

    try {
      const { error } = await supabase.rpc(
        "redeem_coach_invitation",
        {
          p_invite_code: code,
        }
      );

      if (error) throw error;

      setMessage("Successfully connected to your coach!");
      setInviteCode("");
      setShowInviteInput(false);

      Alert.alert(
        "Success!",
        "You have successfully joined your coach."
      );
    } catch (error) {
      console.error("Join coach error:", error);

      Alert.alert(
        "Unable to Join Coach",
        "The code may be invalid, expired, or already used."
      );
    } finally {
      setJoining(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          Loading your account...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        WELCOME TO FORGD
      </Text>

      <Text style={styles.subtitle}>
        ATHLETE DASHBOARD
      </Text>

      <Text style={styles.email}>
        Signed in as: {user?.email ?? "No active session"}
      </Text>

      {/* NEW: Join Coach button */}
      <Pressable
        style={styles.joinButton}
        disabled={joining}
        onPress={() => {
          setShowInviteInput(!showInviteInput);
          setMessage("");
        }}
      >
        <Text style={styles.joinButtonText}>
          + JOIN COACH
        </Text>
      </Pressable>

      {/* NEW: Invitation code input */}
      {showInviteInput && (
        <View style={styles.inviteContainer}>
          <Text style={styles.inputLabel}>
            ENTER INVITATION CODE
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter code"
            placeholderTextColor="#777"
            value={inviteCode}
            onChangeText={setInviteCode}
            autoCapitalize="none"
            autoCorrect={false}
            editable={!joining}
          />

          <Pressable
            style={[
              styles.submitButton,
              joining && styles.disabledButton,
            ]}
            onPress={handleJoinCoach}
            disabled={joining}
          >
            {joining ? (
              <ActivityIndicator color="#080b0b" />
            ) : (
              <Text style={styles.submitButtonText}>
                CONNECT TO COACH
              </Text>
            )}
          </Pressable>
        </View>
      )}

      {!!message && (
        <Text style={styles.successText}>
          {message}
        </Text>
      )}

      {/* Existing logout button */}
      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>
          SIGN OUT
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
    alignItems: "center",
    padding: 24,
  },

  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    textAlign: "center",
  },

  subtitle: {
    color: "#41e6b4",
    fontSize: 18,
    marginTop: 12,
    textAlign: "center",
  },

  email: {
    color: "#ffffff",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },

  joinButton: {
    backgroundColor: "#41e6b4",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 40,
    marginTop: 32,
    alignItems: "center",
  },

  joinButtonText: {
    color: "#080b0b",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  inviteContainer: {
    width: "100%",
    marginTop: 24,
    alignItems: "center",
  },

  inputLabel: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 12,
  },

  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#293232",
    borderRadius: 8,
    backgroundColor: "#111717",
    color: "#ffffff",
    padding: 16,
    fontSize: 16,
  },

  submitButton: {
    backgroundColor: "#41e6b4",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },

  submitButtonText: {
    color: "#080b0b",
    fontSize: 14,
    fontWeight: "bold",
  },

  disabledButton: {
    opacity: 0.5,
  },

  successText: {
    color: "#41e6b4",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },

  logoutButton: {
    marginTop: 32,
    borderWidth: 2,
    borderColor: "#41e6b4",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 40,
    alignItems: "center",
  },

  logoutButtonText: {
    color: "#41e6b4",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
