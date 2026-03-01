import React from "react";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";
import { Card } from "../../../ui/components/Card";
import { Screen } from "../../../ui/components/Screen";
import { SectionHeader } from "../../../ui/components/SectionHeader";

function useText() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";
  return {
    text: isDark ? "#EAF1FF" : "#111111",
    subtext: isDark ? "#A9B6CC" : "#555555",
    badgeBg: isDark ? "#1B2A44" : "#111111",
    badgeText: "#FFFFFF",
  };
}

type ThreadRowProps = {
  name: string;
  preview: string;
  time: string;
  unreadCount?: number;
  onPress?: () => void;
};

function ThreadRow({ name, preview, time, unreadCount = 0, onPress }: ThreadRowProps) {
  const { text, subtext, badgeBg, badgeText } = useText();

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.8 }]}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name.slice(0, 1).toUpperCase()}</Text>
      </View>

      <View style={styles.middle}>
        <Text style={[styles.name, { color: text }]} numberOfLines={1}>
          {name}
        </Text>
        <Text style={[styles.preview, { color: subtext }]} numberOfLines={1}>
          {preview}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.time, { color: subtext }]}>{time}</Text>
        {unreadCount > 0 ? (
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <Text style={[styles.badgeText, { color: badgeText }]}>{unreadCount}</Text>
          </View>
        ) : (
          <View style={{ height: 18 }} />
        )}
      </View>
    </Pressable>
  );
}

export function Inbox() {
  return (
    <Screen>
      <SectionHeader title="Inbox" actionText="New" onPressAction={() => {}} />

      <Card>
        <ThreadRow
          name="Sarah M."
          preview="Can you send the estimate today?"
          time="2m"
          unreadCount={2}
          onPress={() => {}}
        />
        <ThreadRow
          name="Mike R."
          preview="What’s the soonest install date?"
          time="1h"
          unreadCount={1}
          onPress={() => {}}
        />
        <ThreadRow
          name="Ashley C."
          preview="Thanks — deposit sent."
          time="Yesterday"
          unreadCount={0}
          onPress={() => {}}
        />
      </Card>

      <View style={{ height: 16 }} />

      <SectionHeader title="New Leads" />

      <Card>
        <ThreadRow
          name="New Lead"
          preview="Website form: 'Looking for permanent lights…'"
          time="Today"
          unreadCount={1}
          onPress={() => {}}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(150,150,150,0.25)",
  },

  avatar: {
    height: 38,
    width: 38,
    borderRadius: 19,
    backgroundColor: "rgba(120,120,120,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    fontWeight: "800",
    fontSize: 16,
  },

  middle: { flex: 1 },
  name: { fontSize: 15, fontWeight: "700" },
  preview: { marginTop: 2, fontSize: 13 },

  right: { alignItems: "flex-end", marginLeft: 10 },
  time: { fontSize: 12, fontWeight: "600", marginBottom: 6 },
  badge: {
    minWidth: 22,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontSize: 12, fontWeight: "800" },
});