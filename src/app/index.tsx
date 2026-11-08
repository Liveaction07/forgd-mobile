
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>FORGD</Text>

      <Text style={styles.slogan}>
        QUITTING IS NOT AN OPTION.
      </Text>

      {/* GET STARTED BUTTON */}
      <Pressable
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>
          GET STARTED
        </Text>
      </Pressable>

      {/* LOGIN BUTTON */}
      <Pressable
        style={styles.loginButton}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.loginButtonText}>
          LOG IN
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
    backgroundColor: "transparent",
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
