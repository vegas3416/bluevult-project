import React from 'react';
import { StyleSheet, View, ViewStyle, useColorScheme } from 'react-native';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export function Card({ children, style }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: isDark ? '#121923' : '#FFFFFF',
          borderColor: isDark ? '#243244' : '#D9D9D9',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 14,
  },
});
