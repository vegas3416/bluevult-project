import React from "react";
import { Text } from "react-native";
import { Screen } from "../../../ui/components/Screen";

export function SettingsScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Settings</Text>
      <Text>Company profile, team, integrations, branding.</Text>
    </Screen>
  );
}
