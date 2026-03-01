import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React from "react";
import { Text, useColorScheme } from "react-native";

import { Button } from "@/ui/components/Button";
import { Card } from "@/ui/components/Card";
import { Screen } from "@/ui/components/Screen";
import { SectionHeader } from "@/ui/components/SectionHeader";

function useText() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  return {
    text: isDark ? "#EAF1FF" : "#111111",
    subtext: isDark ? "#A9B6CC" : "#555555",
  };
}

export default function SettingsScreen() {
  const { logOut, isLoggedIn } = useAuth();
  const router = useRouter();
  const { text, subtext } = useText();

  const handleLogout = () => {
    logOut();
    router.replace("/login");
  };

  return (
    <Screen>
      <SectionHeader title="Account" />

      <Card style={{ marginBottom: 16 }}>
        <Text style={[{ fontSize: 15, fontWeight: "600", color: text }]}>
          Logged In Status
        </Text>
        <Text style={[{ marginTop: 4, color: subtext }]}>
          {String(isLoggedIn)}
        </Text>
      </Card>

      <SectionHeader title="Website Settings" />

      <Card style={{ marginBottom: 16 }}>
        <Button
          title="Edit Website Content"
          variant="secondary"
          onPress={() => {}}
          style={{ marginBottom: 10 }}
        />

        <Button
          title="Update Branding"
          variant="secondary"
          onPress={() => {}}
        />
      </Card>

      <SectionHeader title="System" />

      <Button title="Log Out" onPress={handleLogout} />
    </Screen>
  );
}