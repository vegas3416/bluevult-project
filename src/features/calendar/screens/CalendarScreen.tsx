import React from "react";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import { Card } from "../../../ui/components/Card";
import { Screen } from "../../../ui/components/Screen";
import { SectionHeader } from "../../../ui/components/SectionHeader";

function useText() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  return {
    text: isDark ? "#EAF1FF" : "#111111",
    subtext: isDark ? "#A9B6CC" : "#555555",
  };
}

type JobRowProps = {
  time: string;
  title: string;
  location: string;
};

function JobRow({ time, title, location }: JobRowProps) {
  const { text, subtext } = useText();

  return (
    <View style={styles.row}>
      <Text style={[styles.time, { color: subtext }]}>{time}</Text>

      <View style={styles.jobInfo}>
        <Text style={[styles.jobTitle, { color: text }]}>{title}</Text>
        <Text style={[styles.jobLocation, { color: subtext }]}>{location}</Text>
      </View>
    </View>
  );
}

export function CalendarScreen() {
  const { text } = useText();

  return (
    <Screen>
      <SectionHeader title="Today" />

      <Card style={styles.cardSpacing}>
        <JobRow
          time="9:00 AM"
          title="Install Permanent Lights"
          location="Round Rock – Mike R."
        />
        <JobRow
          time="3:00 PM"
          title="Estimate Follow-Up"
          location="Pflugerville – Sarah M."
        />
      </Card>

      <SectionHeader title="Tomorrow" />

      <Card>
        <JobRow
          time="11:00 AM"
          title="New Install"
          location="Georgetown – Brandon K."
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardSpacing: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  time: {
    width: 85,
    fontSize: 13,
    fontWeight: "600",
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  jobLocation: {
    fontSize: 13,
    marginTop: 2,
  },
});