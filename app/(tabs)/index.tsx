// app/(tabs)/index.tsx
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import { Button } from '@/ui/components/Button';
import { Card } from '../../src/ui/components/Card';
import { Screen } from '../../src/ui/components/Screen';
import { SectionHeader } from '../../src/ui/components/SectionHeader';

function useTextColors() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    text: isDark ? '#EAF1FF' : '#111111',
    subtext: isDark ? '#A9B6CC' : '#555555',
    muted: isDark ? '#8EA0BA' : '#777777',
    border: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
    card: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    chipBg: isDark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.55)',
  };
}

type StatProps = { label: string; value: string };

function Stat({ label, value }: StatProps) {
  const { text, muted } = useTextColors();
  return (
    <Card style={styles.statCard}>
      <Text style={[styles.statValue, { color: text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: muted }]}>{label}</Text>
    </Card>
  );
}

type TodayJob = {
  id: string;
  customerName: string;
  title: string;
  time: string;
  location?: string;
  imageUrl?: string;
};

function JobCard({ job, onPress }: { job: TodayJob; onPress: () => void }) {
  const { text, muted, border, card, chipBg } = useTextColors();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.jobCard, { backgroundColor: card, borderColor: border }]}
    >
      <View style={styles.jobImageWrap}>
        {job.imageUrl ? (
          <Image source={{ uri: job.imageUrl }} style={styles.jobImage} />
        ) : (
          <View style={styles.jobImagePlaceholder}>
            <Text style={{ color: 'rgba(255,255,255,0.75)', fontWeight: '800' }}>No photo</Text>
          </View>
        )}

        <View style={[styles.jobChip, { backgroundColor: chipBg, borderColor: border }]}>
          <Text style={styles.jobChipText}>{job.time}</Text>
        </View>
      </View>

      <View style={styles.jobMeta}>
        <Text numberOfLines={1} style={[styles.jobCustomer, { color: text }]}>
          {job.customerName}
        </Text>
        <Text numberOfLines={1} style={[styles.jobTitle, { color: muted }]}>
          {job.title}
        </Text>
        {job.location ? (
          <Text numberOfLines={1} style={[styles.jobLocation, { color: muted }]}>
            {job.location}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { text, subtext, muted, border, card } = useTextColors();
  const [query, setQuery] = useState('');

  // Mock data for now (swap later with real API / TanStack Query)
  const todaysJobs: TodayJob[] = useMemo(
    () => [
      {
        id: '1',
        customerName: 'Mike R.',
        title: 'Install Lights',
        time: '3:00 PM',
        location: 'Pflugerville',
        imageUrl:
          'https://images.unsplash.com/photo-1505691723518-36a5ac3b2b24?auto=format&fit=crop&w=1200&q=60',
      },
      {
        id: '2',
        customerName: 'Ashley C.',
        title: 'Quote Follow-up',
        time: '5:30 PM',
        location: 'Georgetown',
        imageUrl:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=60',
      },
      {
        id: '3',
        customerName: 'Brandon K.',
        title: 'Service Call',
        time: '7:15 PM',
        location: 'Austin',
      },
    ],
    [],
  );

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return todaysJobs;
    return todaysJobs.filter(j => {
      return (
        j.customerName.toLowerCase().includes(q) ||
        j.title.toLowerCase().includes(q) ||
        (j.location?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [todaysJobs, query]);

  return (
    <Screen>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: text }]}>Your Company</Text>
            <Text style={[styles.subtitle, { color: subtext }]}>
              Overview of jobs, customers, and messages
            </Text>
          </View>

          <Pressable
            onPress={() => router.push('/(tabs)/settings')}
            style={styles.avatarBtn}
            hitSlop={10}
          >
            <Ionicons name="person-circle-outline" size={34} color={text} />
          </Pressable>
        </View>

        {/* Search (optional but feels "product") */}
        <View style={[styles.searchWrap, { backgroundColor: card, borderColor: border }]}>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search jobs, customers, cities…"
            placeholderTextColor={muted}
            style={[styles.searchInput, { color: text }]}
            returnKeyType="search"
          />
          {!!query && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Text style={{ color: muted, fontWeight: '800' }}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Quick Stats */}
        <SectionHeader title="Quick Stats" />
        <View style={styles.row}>
          <View style={styles.flex1}>
            <Stat label="Open Jobs" value="4" />
          </View>
          <View style={[styles.flex1, styles.gutter]}>
            <Stat label="Today" value="2" />
          </View>
          <View style={styles.flex1}>
            <Stat label="Unread" value="3" />
          </View>
        </View>

        {/* Quick Actions */}
        <Button
          title="+ New Customer"
          onPress={() => router.push('/customers/new')}
          style={{ marginBottom: 0 }}
        />

        {/* Today's Jobs */}
        <SectionHeader
          title="Today's Jobs"
          actionText="View all"
          onPressAction={() => router.push('/jobs')}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.jobsRow}
        >
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onPress={() => router.push('/(tabs)/calendar')}
              // later: router.push(`/jobs/${job.id}`)
            />
          ))}
          {filteredJobs.length === 0 ? (
            <View style={[styles.emptyState, { borderColor: border, backgroundColor: card }]}>
              <Text style={{ color: text, fontWeight: '800' }}>No matches</Text>
              <Text style={{ color: muted, marginTop: 4 }}>
                Try searching by name, city, or job type.
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { marginHorizontal: 12 },
  header: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { marginTop: 6, fontSize: 14 },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatarBtn: {
    padding: 8,
  },

  searchWrap: {
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },

  row: { flexDirection: 'row', marginBottom: 16 },
  flex1: { flex: 1 },
  gutter: { marginHorizontal: 10 },

  statCard: { padding: 14 },
  statValue: { fontSize: 20, fontWeight: '800' },
  statLabel: { marginTop: 4, fontSize: 12, fontWeight: '600' },

  jobsRow: {
    paddingVertical: 6,
    paddingRight: 6,
    gap: 12,
  },

  jobCard: {
    width: 178,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },

  jobImageWrap: {
    height: 112,
  },
  jobImage: {
    width: '100%',
    height: '100%',
  },
  jobImagePlaceholder: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  jobMeta: {
    padding: 10,
    gap: 3,
  },
  jobCustomer: {
    fontSize: 14,
    fontWeight: '900',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  jobLocation: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.9,
  },

  jobChip: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
  },
  jobChipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '900',
  },

  emptyState: {
    width: 220,
    borderRadius: 16,
    borderWidth: 1,
    padding: 12,
    justifyContent: 'center',
  },

  listItem: { fontSize: 14, marginBottom: 8 },
});
