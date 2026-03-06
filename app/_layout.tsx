import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>

      <AuthGate />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

function AuthGate() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();

  if (!segments) return null;

  const inTabs = segments[0] === '(tabs)';
  const inLogin = segments[0] === 'login';
  const inJobs = segments[0] === 'jobs';
  const inCustomers = segments[0] === 'customers';

  if (!isLoggedIn && !inLogin) return <Redirect href="/login" />;
  if (isLoggedIn && !inTabs && !inJobs && !inCustomers) {
    return <Redirect href="/(tabs)" />;
  }

  return null;
}
