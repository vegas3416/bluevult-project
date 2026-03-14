import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';

type JobListItem = {
  id: string;
  customerName: string;
  title: string;
  statusLabel: string;
  lastUpdated: string;
  imageUrl?: string;
};

export function JobsListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const jobs = useMemo<JobListItem[]>(
    () => [
      {
        id: '1',
        customerName: 'Mike Rodriguez',
        title: 'Install Patio Lights',
        statusLabel: 'Scheduled · Today 3:00 PM',
        lastUpdated: '2h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=60',
      },
      {
        id: '2',
        customerName: 'Ashley Carter',
        title: 'Quote Follow-up',
        statusLabel: 'Estimate pending',
        lastUpdated: 'Yesterday',
        imageUrl:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=60',
      },
      {
        id: '3',
        customerName: 'Brandon King',
        title: 'Service Call',
        statusLabel: 'Open',
        lastUpdated: '3d ago',
      },
      {
        id: '4',
        customerName: 'Danielle Smith',
        title: 'Fence Repair',
        statusLabel: 'Scheduled · Mar 15',
        lastUpdated: 'Mar 10',
      },
      {
        id: '5',
        customerName: 'Ashley Carter',
        title: 'Quote Follow-up',
        statusLabel: 'Estimate pending',
        lastUpdated: 'Yesterday',
        imageUrl:
          'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=60',
      },
      {
        id: '6',
        customerName: 'Brandon King',
        title: 'Service Call',
        statusLabel: 'Open',
        lastUpdated: '3d ago',
      },
      {
        id: '7',
        customerName: 'Danielle Smith',
        title: 'Fence Repair',
        statusLabel: 'Scheduled · Mar 15',
        lastUpdated: 'Mar 10',
      },
    ],
    [],
  );

  const filteredJobs = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return jobs;

    return jobs.filter(job => {
      return (
        job.customerName.toLowerCase().includes(q) ||
        job.title.toLowerCase().includes(q) ||
        job.statusLabel.toLowerCase().includes(q)
      );
    });
  }, [jobs, query]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Jobs</Text>
          <Text style={styles.subtitle}>{filteredJobs.length} total</Text>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#6B7280" />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search jobs, customers, status..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />

          {!!query && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Job List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredJobs.map(job => (
            <JobRow key={job.id} job={job} onPress={() => router.push(`/jobs/${job.id}`)} />
          ))}

          {filteredJobs.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No jobs found</Text>
              <Text style={styles.emptySubtitle}>Try searching by customer, title, or status.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Screen>
  );
}

function JobRow({ job, onPress }: { job: JobListItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.rowCard}>
        <View style={styles.rowInner}>
          {/* Image Rail */}
          <View style={styles.imageColumn}>
            {job.imageUrl ? (
              <Image source={{ uri: job.imageUrl }} style={styles.jobImage} />
            ) : (
              <View style={styles.imageFallback}>
                <Ionicons name="briefcase-outline" size={24} color="#6B7280" />
              </View>
            )}
          </View>

          {/* Content */}
          <View style={styles.mainContent}>
            <View style={styles.topRow}>
              <Text numberOfLines={1} style={styles.customerName}>
                {job.customerName}
              </Text>

              <View style={styles.metaRight}>
                <Text style={styles.updatedText}>{job.lastUpdated}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </View>

            <Text numberOfLines={1} style={styles.jobTitle}>
              {job.title}
            </Text>

            <Text numberOfLines={1} style={styles.statusLabel}>
              {job.statusLabel}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flex: 1,
  },

  headerRow: {
    marginBottom: 14,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    marginBottom: 14,
    gap: 8,
    backgroundColor: '#FFFFFF',
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#111111',
  },

  clearText: {
    fontWeight: '800',
    color: '#6B7280',
  },

  scrollContent: {
    paddingBottom: 24,
    gap: 12,
  },

  rowCard: {
    padding: 0,
    overflow: 'hidden',
  },

  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 96,
  },

  imageColumn: {
    width: 88,
    height: 96,
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.05)',
  },

  jobImage: {
    width: '100%',
    height: '100%',
  },

  imageFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainContent: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    justifyContent: 'center',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
    flex: 1,
  },

  jobTitle: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },

  statusLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },

  metaRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  updatedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
  },

  emptyState: {
    marginTop: 8,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
