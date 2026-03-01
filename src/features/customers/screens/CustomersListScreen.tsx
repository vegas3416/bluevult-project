import React from 'react';
import { Text } from 'react-native';
import { Screen } from '../../../ui/components/Screen';

export function CustomersListScreen() {
  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600' }}>Customers</Text>
      <Text>List customers here.</Text>
    </Screen>
  );
}
