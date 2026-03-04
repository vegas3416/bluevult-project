import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';
import { getJobById } from '../data/mockJobs';

export function JobDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = params.id ?? '';

  const job = useMemo(() => getJobById(String(id)), [id]);

  const handleBack = () => {
    if (router.canGoBack()) return router.back();
    return router.replace('/(tabs)/jobs');
  };

  if (!job) {
    return (
      <Screen>
        <TopBar title="Job" onBack={handleBack} />

        <Text style={{ fontSize: 20, fontWeight: '800', marginBottom: 10 }}>Job not found</Text>
        <Text style={{ marginBottom: 16 }}>No job exists for id: {String(id)}</Text>
        <Button title="Back" variant="secondary" onPress={handleBack} />
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar title={job.customerName} onBack={handleBack} />

      <View style={{ marginBottom: 14 }}>
        <Text style={{ fontSize: 22, fontWeight: '900', marginBottom: 4 }}>{job.customerName}</Text>
        <Text style={{ opacity: 0.75, fontWeight: '700' }}>
          {job.city} • {job.title}
        </Text>
      </View>

      <Card style={{ padding: 0, overflow: 'hidden', marginBottom: 12 }}>
        {job.imageUrl ? (
          <Image source={{ uri: job.imageUrl }} style={styles.heroImg} />
        ) : (
          <View style={[styles.heroImg, styles.heroPlaceholder]}>
            <Text style={{ fontWeight: '800', opacity: 0.7 }}>No photo yet</Text>
          </View>
        )}
      </Card>

      <Card style={{ marginBottom: 12 }}>
        <Text style={styles.row}>
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.value}>{job.status}</Text>
        </Text>

        <Text style={styles.row}>
          <Text style={styles.label}>Scheduled: </Text>
          <Text style={styles.value}>{job.scheduledAt ?? 'Not scheduled'}</Text>
        </Text>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <Text style={styles.label}>Notes</Text>
        <Text style={[styles.value, { marginTop: 6 }]}>{job.notes ?? 'No notes yet.'}</Text>
      </Card>

      <View style={{ height: 8 }} />
    </Screen>
  );
}

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={22} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      <Text numberOfLines={1} style={styles.topTitle}>
        {title}
      </Text>

      {/* spacer to balance layout */}
      <View style={{ width: 64 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    width: 64,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '800',
  },

  heroImg: { width: '100%', height: 180 },
  heroPlaceholder: { alignItems: 'center', justifyContent: 'center' },
  row: { marginBottom: 8 },
  label: { fontWeight: '900', opacity: 0.7 },
  value: { fontWeight: '800' },
});
