import { useRouter } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Screen } from '../../../ui/components/Screen';

export function JobsListScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 16 }}>Jobs</Text>

      <Button
        title="+ New Job"
        onPress={() => router.push('/(tabs)/jobs/newjob')}
        style={{ marginBottom: 12 }}
      />

      <Button
        title="Open Job #1"
        onPress={() => router.push({ pathname: '/(tabs)/jobs/[id]', params: { id: '1' } })}
      />

      <Button
        title="Open Job #2"
        onPress={() => router.push({ pathname: '/(tabs)/jobs/[id]', params: { id: '2' } })}
      />
    </Screen>
  );
}
