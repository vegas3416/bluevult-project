import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';
import { getJobsByCustomerId } from '../../jobs/data/jobs.repository';
import { getCustomerById } from '../data/customers.repository';

type CustomerOrigin = 'job' | 'jobs' | 'calendar' | 'inbox' | null;

type CustomerNote = {
  id: string;
  text: string;
  createdAt: string;
};

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

  const notes = useMemo<CustomerNote[]>(
    () => [
      {
        id: '1',
        text: 'Customer mentioned gate access on the left side of the property.',
        createdAt: 'Today · 9:42 AM',
      },
      {
        id: '2',
        text: 'Dog is friendly but usually loose in the backyard.',
        createdAt: 'Yesterday · 4:18 PM',
      },
      {
        id: '3',
        text: 'Prefers afternoon arrival windows when possible.',
        createdAt: 'Mar 10 · 11:06 AM',
      },
    ],
    [],
  );

  const handleBack = () => {
    if (origin === 'job' && jobId) {
      return router.replace({
        pathname: '/jobs/[id]',
        params: { id: jobId },
      });
    }

    if (origin === 'jobs') {
      return router.replace('/jobs');
    }

    if (origin === 'calendar') {
      return router.replace('/calendar');
    }

    if (origin === 'inbox') {
      return router.replace('/inbox');
    }

    if (router.canGoBack()) return router.back();

    return router.replace('/');
  };

  const handleCall = () => {
    if (!customer?.phone) return;
    // Later: Linking.openURL(`tel:${customer.phone}`)
  };

  const handleEmail = () => {
    if (!customer?.email) return;
    // Later: Linking.openURL(`mailto:${customer.email}`)
  };

  const handleOpenMaps = () => {
    if (!customer?.address) return;
    // Later: Linking.openURL with maps query
  };

  const handleAddNote = () => {
    // Later: open add note modal
  };

  const handleEditNote = (noteId: string) => {
    // Later: open edit note modal
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
        {/* Contact Section */}

        <View style={styles.section}>
          <DetailRow
            label="Phone"
            value={customer.phone || 'No phone number'}
            icon="call-outline"
            onPressIcon={customer.phone ? handleCall : undefined}
          />

          <DetailRow
            label="Email"
            value={customer.email || 'No email address'}
            icon="mail-outline"
            onPressIcon={customer.email ? handleEmail : undefined}
          />

          <DetailRow
            label="Address"
            value={
              customer.address
                ? `${customer.address}${customer.city ? `, ${customer.city}` : ''}`
                : 'No address on file'
            }
            icon="location-outline"
            onPressIcon={customer.address ? handleOpenMaps : undefined}
            isLast
          />
        </View>

        {/* Notes Section */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Notes</Text>

            <Pressable onPress={handleAddNote} hitSlop={10} style={styles.addIconButton}>
              <Ionicons name="add" size={22} color="#0b0b0cff" />
            </Pressable>
          </View>

          <View style={styles.notesList}>
            {notes.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyTitle}>No customer notes yet</Text>
                <Text style={styles.emptySubtitle}>
                  Tap the plus icon to add a timestamped customer note.
                </Text>
              </View>
            ) : (
              notes.map(note => (
                <Pressable
                  key={note.id}
                  onPress={() => handleEditNote(note.id)}
                  style={styles.noteRow}
                >
                  <View style={styles.noteTextWrap}>
                    <Text style={styles.noteTimestamp}>{note.createdAt}</Text>
                    <Text style={styles.noteText}>{note.text}</Text>
                  </View>

                  <Ionicons name="create-outline" size={18} color="#9CA3AF" />
                </Pressable>
              ))
            )}
          </View>
        </View>

        {/* Jobs Section */}
        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Jobs</Text>
            <Text style={styles.jobsCount}>{jobs.length}</Text>
          </View>

          <View style={styles.jobsList}>
            {jobs.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Text style={styles.emptyTitle}>No jobs tied to this customer yet</Text>
                <Text style={styles.emptySubtitle}>
                  Jobs linked to this customer will show here.
                </Text>
              </View>
            ) : (
              jobs.map(job => (
                <CustomerJobRow
                  key={job.id}
                  customerName={customer.name}
                  title={job.title}
                  statusLabel={`${job.status} · ${job.address}${job.city ? `, ${job.city}` : ''}`}
                  lastUpdated={job.scheduledAt ?? 'No date'}
                  onPress={() =>
                    router.push({
                      pathname: '/jobs/[id]',
                      params: {
                        id: job.id,
                        origin: 'customer',
                        customerId: customer.id,
                        customerOrigin: origin ?? undefined,
                        customerJobId: jobId ?? undefined,
                      },
                    })
                  }
                />
              ))
            )}
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </Screen>
  );
}

function CustomerJobRow({
  customerName,
  title,
  statusLabel,
  lastUpdated,
  onPress,
}: {
  customerName: string;
  title: string;
  statusLabel: string;
  lastUpdated: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.rowCard}>
        <View style={styles.rowInner}>
          <View style={styles.imageColumn}>
            <View style={styles.imageFallback}>
              <Ionicons name="briefcase-outline" size={24} color="#6B7280" />
            </View>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.topRow}>
              <Text numberOfLines={1} style={styles.jobCustomerName}>
                {customerName}
              </Text>

              <View style={styles.metaRight}>
                <Text style={styles.updatedText}>{lastUpdated}</Text>
                <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
              </View>
            </View>

            <Text numberOfLines={1} style={styles.jobTitle}>
              {title}
            </Text>

            <Text numberOfLines={1} style={styles.statusLabel}>
              {statusLabel}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

function DetailRow({
  label,
  value,
  icon,
  onPressIcon,
  isLast,
}: {
  label: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPressIcon?: () => void;
  isLast?: boolean;
}) {
  return (
    <View style={[styles.detailRow, !isLast && styles.detailRowBorder]}>
      <View style={styles.detailTextWrap}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>

      <Pressable
        onPress={onPressIcon}
        hitSlop={10}
        style={[styles.detailIconButton, !onPressIcon && styles.detailIconButtonDisabled]}
        disabled={!onPressIcon}
      >
        <Ionicons name={icon} size={20} color={onPressIcon ? '#111111' : '#C7CDD6'} />
      </Pressable>
    </View>
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

  section: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#FFFFFF',
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 72,
    paddingHorizontal: 4,
  },

  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  detailTextWrap: {
    flex: 1,
    paddingVertical: 14,
  },

  detailLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    lineHeight: 21,
  },

  detailIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },

  detailIconButtonDisabled: {
    opacity: 0.55,
  },

  sectionBlock: {
    marginTop: 22,
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    backgroundColor: '#363738ff',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f1ededff',
  },

  addIconButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b6c7e8ff',
  },

  notesList: {
    gap: 0,
    borderTopWidth: 2,
    //borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#FFFFFF',
  },

  noteRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },

  noteTextWrap: {
    flex: 1,
    paddingRight: 12,
  },

  noteTimestamp: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 6,
  },

  noteText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
    color: '#111111',
  },

  jobsCount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6B7280',
  },

  jobsList: {
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
    backgroundColor: '#EEF2FF',
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

  jobCustomerName: {
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

  emptyWrap: {
    paddingVertical: 18,
    paddingHorizontal: 4,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#111111',
  },

  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  notFoundWrap: {
    paddingTop: 24,
  },

  notFoundTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 10,
    color: '#111111',
  },

  notFoundText: {
    marginBottom: 16,
    fontSize: 15,
    color: '#374151',
  },
});
