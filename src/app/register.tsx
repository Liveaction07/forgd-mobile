import { router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform, } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RegisterScreen() {
  const { role } = useLocalSearchParams<{
    role?: string;
  }>();

  const accountType =
    role === "coach" ? "COACH" : "ATHLETE";

const [fullName, setFullName] = useState("");
const [email, setEmail] = useState("");
const [phoneNumber, setPhoneNumber] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [error, setError] = useState("");
const [success, setSuccess] = useState("");

function handleRegister() {
  setError("");
  setSuccess("");

  if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
    setError("Please complete all required fields.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  setSuccess("Registration form validated successfully!");
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
      <Text style={styles.title}>
        CREATE YOUR ACCOUNT
      </Text>

      <Text style={styles.subtitle}>
        REGISTER AS {accountType}
      </Text>

      <View style={styles.form}>
        <Text style={styles.label}>
          FULL NAME
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#8b9595"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
          autoComplete="name"
        />
        <Text style={styles.label}>
  EMAIL ADDRESS
</Text>

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
        <Text style={styles.label}>
  PHONE NUMBER (optional)
</Text>

<TextInput
  style={styles.input}
  placeholder="Enter your phone number"
  placeholderTextColor="#8b9595"
  value={phoneNumber}
  onChangeText={setPhoneNumber}
  keyboardType="phone-pad"
  autoComplete="tel"
/>
        <Text style={styles.label}>
  PASSWORD
</Text>

<TextInput
  style={styles.input}
  placeholder="Enter your password"
  placeholderTextColor="#8b9595"
  value={password}
  onChangeText={setPassword}
  secureTextEntry
  autoCapitalize="none"
  autoComplete="new-password"
/>
        <Text style={styles.label}>
  CONFIRM PASSWORD
</Text>

<TextInput
  style={styles.input}
  placeholder="Confirm your password"
  placeholderTextColor="#8b9595"
  value={confirmPassword}
  onChangeText={setConfirmPassword}
  secureTextEntry
  autoCapitalize="none"
  autoComplete="new-password"
/>

{/* ERROR MESSAGE */}
{error !== "" && (
  <Text
    style={styles.errorText}
    accessibilityRole="alert"
  >
    {error}
  </Text>
)}

{/* SUCCESS MESSAGE */}
{success !== "" && (
  <Text style={styles.successText}>
    {success}
  </Text>
)}

{/* CREATE ACCOUNT BUTTON */}
<Pressable
  style={styles.registerButton}
  onPress={handleRegister}
>
  <Text style={styles.registerButtonText}>
    CREATE ACCOUNT →
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
  padding: 24,
  paddingTop: 60,
  paddingBottom: 60,
},

title: {
  fontSize: 32,
  fontWeight: "900",
  color: "#ffffff",
  textAlign: "center",
},

subtitle: {
  marginTop: 14,
  marginBottom: 36,
  color: "#41e6b4",
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 2,
  textAlign: "center",
},

form: {
  gap: 12,
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

registerButton: {
  marginTop: 20,
  backgroundColor: "#41e6b4",
  borderRadius: 8,
  paddingVertical: 18,
  alignItems: "center",
},

registerButtonText: {
  color: "#080b0b",
  fontSize: 16,
  fontWeight: "bold",
  letterSpacing: 1,
},

errorText: {
  color: "#ff6b6b",
  fontSize: 14,
  marginTop: 8,
},

successText: {
  color: "#41e6b4",
  fontSize: 14,
  marginTop: 8,
},

});
