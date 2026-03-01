import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Button, Text, View } from "react-native";

export default function LoginScreen() {
  const { logIn } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    logIn();
    router.replace("/(tabs)");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Login</Text>
      <Button title="Log In" onPress={handleLogin} />
    </View>
  );
}