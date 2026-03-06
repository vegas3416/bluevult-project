import React from 'react';
import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';

type Props = {
  title: string;
  actionText?: string;
  onPressAction?: () => void;
};

export function SectionHeader({ title, actionText, onPressAction }: Props) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: isDark ? '#EAF1FF' : '#111111' }]}>{title}</Text>

      {actionText && onPressAction ? (
        <Pressable onPress={onPressAction} hitSlop={10}>
          <Text style={[styles.action, { color: isDark ? '#A9B6CC' : '#555555' }]}>
            {actionText}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    marginTop: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: 16, fontWeight: '700' },
  action: { fontSize: 13, fontWeight: '600' },
});
