import React from "react";
import { SafeAreaView, ViewStyle } from "react-native";

type Props = { children: React.ReactNode; style?: ViewStyle };

export function Screen({ children, style }: Props) {
  return <SafeAreaView style={[{ flex: 1, padding: 16 }, style]}>{children}</SafeAreaView>;
}
