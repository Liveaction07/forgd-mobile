
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";

export default function CoachDashboard() {
  const router = useRouter();
 

  const { loading, user, signOut } = useAuth();


  console.log("Coach auth loading:", loading);
  console.log("Coach auth user:", user?.email);

  async function handleLogout() {
    try {
      // Sign out through Supabase Auth
      await signOut();

      // Return to login screen
      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Logout Failed",
        "Unable to sign out. Please try again."
      );
    }
  }
async function handleInviteAthlete() {
  try {
    const { data, error } = await supabase.rpc(
      "create_coach_invitation"
    );

    if (error) {
      throw error;
    }

    Alert.alert(
      "Athlete Invitation",
      `Share this code with your athlete:\n\n${data}`
    );
  } catch (error) {
    console.error("Invitation error:", error);

    Alert.alert(
      "Invitation Failed",
      "Unable to generate an invitation code."
    );
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
        COACH DASHBOARD
      </Text>

      <Text style={styles.email}>
        Signed in as: {user?.email ?? "No active session"}
      </Text>
      {/* INVITE ATHLETE BUTTON */}
<Pressable
  style={styles.inviteButton}
  onPress={handleInviteAthlete}
>
  <Text style={styles.inviteButtonText}>
    + INVITE ATHLETE
  </Text>
</Pressable>
      {/* LOGOUT BUTTON */}
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
  inviteButton: {
  backgroundColor: "#41e6b4",
  borderRadius: 8,
  paddingVertical: 16,
  paddingHorizontal: 40,
  marginTop: 32,
  alignItems: "center",
},

inviteButtonText: {
  color: "#080b0b",
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1,
},
});
