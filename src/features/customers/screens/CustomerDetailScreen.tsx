import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';
import { getJobsByCustomerId } from '../../jobs/data/jobs.repository';
import { getCustomerById } from '../data/customers.repository';

type CustomerOrigin = 'job' | 'jobs' | 'calendar' | 'inbox' | null;

export function CustomerDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    origin?: string;
    jobId?: string;
  }>();

  const id = params.id ?? '';
  const jobId = params.jobId ? String(params.jobId) : null;

  const origin: CustomerOrigin =
    params.origin === 'job'
      ? 'job'
      : params.origin === 'jobs'
        ? 'jobs'
        : params.origin === 'calendar'
          ? 'calendar'
          : params.origin === 'inbox'
            ? 'inbox'
            : null;

  const customer = useMemo(() => getCustomerById(String(id)), [id]);
  const jobs = useMemo(() => getJobsByCustomerId(String(id)), [id]);

  const handleBack = () => {
    if (origin === 'job' && jobId) {
      return router.replace({
        pathname: '/(tabs)/jobs/[id]',
        params: { id: jobId },
      });
    }

    if (origin === 'jobs') {
      return router.replace('/(tabs)/jobs');
    }

    if (origin === 'calendar') {
      return router.replace('/(tabs)/calendar');
    }

    if (origin === 'inbox') {
      return router.replace('/(tabs)/inbox');
    }

    if (router.canGoBack()) return router.back();

    return router.replace('/(tabs)');
  };

  if (!customer) {
    return (
      <Screen>
        <TopBar title="Customer" onBack={handleBack} />

        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Customer not found</Text>
          <Text style={styles.notFoundText}>No customer exists for id: {String(id)}</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <TopBar title={customer.name} onBack={handleBack} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.sectionCard}>
          <Text style={styles.customerName}>{customer.name}</Text>

          {customer.phone ? (
            <Text style={styles.infoLine}>
              <Text style={styles.infoLabel}>Phone: </Text>
              {customer.phone}
            </Text>
          ) : null}

          {customer.email ? (
            <Text style={styles.infoLine}>
              <Text style={styles.infoLabel}>Email: </Text>
              {customer.email}
            </Text>
          ) : null}

          {customer.address ? (
            <Text style={styles.infoLine}>
              <Text style={styles.infoLabel}>Address: </Text>
              {customer.address}
              {customer.city ? `, ${customer.city}` : ''}
            </Text>
          ) : null}
        </Card>

        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Notes</Text>
          <Text style={styles.notesText}>{customer.notes ?? 'No customer notes yet.'}</Text>
        </Card>

        <View style={styles.jobsHeaderRow}>
          <Text style={styles.sectionTitle}>Jobs</Text>
          <Text style={styles.jobsCount}>{jobs.length}</Text>
        </View>

        <View style={styles.jobsList}>
          {jobs.length === 0 ? (
            <Card>
              <Text style={styles.emptyText}>No jobs tied to this customer yet.</Text>
            </Card>
          ) : (
            jobs.map(job => (
              <Pressable
                key={job.id}
                onPress={() =>
                  router.push({
                    pathname: '/(tabs)/jobs/[id]',
                    params: { id: job.id },
                  })
                }
              >
                <Card style={styles.jobCard}>
                  <View style={styles.jobCardTop}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobStatus}>{job.status}</Text>
                  </View>

                  <Text style={styles.jobAddress}>
                    {job.address} • {job.city}
                  </Text>

                  <Text style={styles.jobSchedule}>{job.scheduledAt ?? 'Not scheduled'}</Text>
                </Card>
              </Pressable>
            ))
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
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

      <View style={styles.topBarSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 12,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 8,
  },
  backBtn: {
    width: 72,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  topBarSpacer: {
    width: 72,
  },

  sectionCard: {
    marginBottom: 14,
  },

  customerName: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
  },

  infoLine: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: '800',
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
  },

  notesText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },

  jobsHeaderRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobsCount: {
    fontSize: 14,
    fontWeight: '800',
    opacity: 0.55,
  },

  jobsList: {
    gap: 12,
  },

  jobCard: {
    marginBottom: 0,
  },
  jobCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 6,
  },
  jobTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '800',
  },
  jobStatus: {
    fontSize: 13,
    fontWeight: '800',
    opacity: 0.65,
    textTransform: 'capitalize',
  },
  jobAddress: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.75,
  },
  jobSchedule: {
    fontSize: 13,
    fontWeight: '700',
    opacity: 0.6,
  },

  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.65,
  },

  notFoundWrap: {
    paddingTop: 24,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
  },
  notFoundText: {
    marginBottom: 16,
    fontSize: 15,
  },
});
