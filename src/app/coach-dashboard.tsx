import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function CoachDashboard() {
  const { user, loading } = useAuth();

  console.log("Coach auth loading:", loading);
  console.log("Coach auth user:", user?.email);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>Loading your account...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO FORGD</Text>

      <Text style={styles.subtitle}>COACH DASHBOARD</Text>

      <Text style={styles.email}>
        Signed in as: {user?.email ?? "No active session"}
      </Text>
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
});
