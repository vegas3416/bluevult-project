import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle, useColorScheme } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export function Button({ title, onPress, variant = "primary", style }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const bg =
    variant === "primary"
      ? isDark
        ? "#1B2A44"
        : "#111111"
      : isDark
      ? "#121923"
      : "#FFFFFF";

  const border =
    variant === "primary" ? "transparent" : isDark ? "#243244" : "#D9D9D9";

  const text = variant === "primary" ? "#FFFFFF" : isDark ? "#EAF1FF" : "#111111";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: bg, borderColor: border, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <Text style={[styles.text, { color: text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
  },
  text: { fontSize: 15, fontWeight: "700" },
});