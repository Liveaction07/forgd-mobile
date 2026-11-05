import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function AthleteDashboard() {
  const { loading, user } = useAuth();

  console.log("Auth loading:", loading);
  console.log("Auth user:", user?.email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME TO FORGD</Text>
      <Text style={styles.subtitle}>Athlete Dashboard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080b0b",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
  },
  subtitle: {
    color: "#41e6b4",
    fontSize: 18,
    marginTop: 12,
  },
});
