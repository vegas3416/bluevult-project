import React from "react";
import { Text } from "react-native";
import { Screen } from "../../../ui/components/Screen";

export function JobsListScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Jobs</Text>
      <Text>List open/scheduled/closed jobs here.</Text>
    </Screen>
  );
}
