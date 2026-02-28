import React from "react";
import { Text } from "react-native";
import { Screen } from "../../../ui/components/Screen";

export function Inbox() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: "600" }}>Inbox</Text>
      <Text>Threads + new leads live here.</Text>
    </Screen>
  );
}
