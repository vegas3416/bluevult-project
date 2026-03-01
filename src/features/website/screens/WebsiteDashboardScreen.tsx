import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../../../ui/components/Screen';

export function WebsiteDashboardScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Website</Text>
      <Text>Edit content blocks, theme, services, and publish.</Text>
    </Screen>
  );
}
