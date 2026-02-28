import React from "react";
import { Text } from "react-native";
import { Screen } from "../../../ui/components/Screen";

export function CalendarScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Calendar</Text>
      <Text>Aggregated view of scheduled jobs + follow-ups.</Text>
    </Screen>
  );
}
