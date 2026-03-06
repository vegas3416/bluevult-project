import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Screen } from '../../src/ui/components/Screen';

export default function CaptureScreen() {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Capture</Text>
        <Text style={styles.subtitle}>This will become the camera / photo upload flow.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    opacity: 0.7,
    fontWeight: '600',
  },
});
