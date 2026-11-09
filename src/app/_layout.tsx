
import { Stack, ThemeProvider, DarkTheme } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import {
  AuthProvider,
  useAuth,
} from "../contexts/AuthContext";

void SplashScreen.preventAutoHideAsync();

function AppNavigator() {
  const { user, loading } = useAuth();

  // Check whether a user is authenticated.
  const isAuthenticated = !!user;

  // Temporary role identification from Supabase metadata.
  const accountType = user?.user_metadata?.account_type;

  const isAthlete =
    isAuthenticated && accountType === "athlete";

  const isCoach =
    isAuthenticated && accountType === "coach";

  useEffect(() => {
    if (!loading) {
      void SplashScreen.hideAsync();
    }
  }, [loading]);

  // Wait until Supabase restores the saved session.
  if (loading) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#080b0b",
        },
      }}
    >
      {/* Welcome screen remains accessible */}
      <Stack.Screen name="index" />

      {/* Registration and login screens */}
      <Stack.Screen name="signup" />
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />

      {/* Only authenticated athletes can enter */}
      <Stack.Protected guard={isAthlete}>
        <Stack.Screen name="athlete-dashboard" />
      </Stack.Protected>

      {/* Only authenticated coaches can enter */}
      <Stack.Protected guard={isCoach}>
        <Stack.Screen name="coach-dashboard" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </ThemeProvider>
  );
}
