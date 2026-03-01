import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle, useColorScheme } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
};

export function Screen({ children, style, padded = true }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  return (
    <SafeAreaView
      style={[
        styles.base,
        { backgroundColor: isDark ? "#0B0F14" : "#FFFFFF" },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1 },
  padded: { padding: 16 },
});