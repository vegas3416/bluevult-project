import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';
import { getCustomerById } from '../../customers/data/customers.repository';
import { getJobById, getJobImagesByJobId, getMessagesByJobId } from '../data/jobs.repository';

type JobOrigin = 'customer' | 'jobs' | 'calendar' | 'inbox' | null;
type CustomerOrigin = 'job' | 'jobs' | 'calendar' | 'inbox' | null;

export function JobDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    origin?: string;
    customerId?: string;
    customerOrigin?: string;
    customerJobId?: string;
  }>();

  const id = params.id ?? '';
  const customerId = params.customerId ? String(params.customerId) : null;
  const customerJobId = params.customerJobId ? String(params.customerJobId) : null;

  const origin: JobOrigin =
    params.origin === 'customer'
      ? 'customer'
      : params.origin === 'jobs'
        ? 'jobs'
        : params.origin === 'calendar'
          ? 'calendar'
          : params.origin === 'inbox'
            ? 'inbox'
            : null;

  const customerOrigin: CustomerOrigin =
    params.customerOrigin === 'job'
      ? 'job'
      : params.customerOrigin === 'jobs'
        ? 'jobs'
        : params.customerOrigin === 'calendar'
          ? 'calendar'
          : params.customerOrigin === 'inbox'
            ? 'inbox'
            : null;

  const [draftMessage, setDraftMessage] = useState('');

  const job = useMemo(() => getJobById(String(id)), [id]);

  const customer = useMemo(() => {
    if (!job) return undefined;
    return getCustomerById(job.customerId);
  }, [job]);

  const messages = useMemo(() => getMessagesByJobId(String(id)), [id]);
  const images = useMemo(() => getJobImagesByJobId(String(id)), [id]);

  const handleBack = () => {
    if (origin === 'customer' && customerId) {
      return router.replace({
        pathname: '/customers/[id]',
        params: {
          id: customerId,
          origin: customerOrigin ?? undefined,
          jobId: customerJobId ?? undefined,
        },
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

    return router.replace('/jobs');
  };

  const handleOpenCustomer = () => {
    if (!customer) return;

    router.push({
      pathname: '/customers/[id]',
      params: {
        id: customer.id,
        origin: 'job',
        jobId: job?.id,
      },
    });
  };

  const handleOpenMaps = () => {
    Alert.alert(
      'Open Maps',
      'Later this will open Apple Maps / Google Maps for directions to this job.',
    );
  };

  const handleViewAllPhotos = () => {
    Alert.alert('Photos', 'Later this will open the full photo gallery.');
  };

  const handleSendMessage = () => {
    if (!draftMessage.trim()) return;

    Alert.alert('Send message?', draftMessage.trim(), [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send',
        onPress: () => {
          setDraftMessage('');
          Alert.alert('Sent', 'Later this will send the message to the customer.');
        },
      },
    ]);
  };

  if (!job) {
    return (
      <Screen>
        <TopBar title="Job" onBack={handleBack} />

        <View style={styles.notFoundWrap}>
          <Text style={styles.notFoundTitle}>Job not found</Text>
          <Text style={styles.notFoundText}>No job exists for id: {String(id)}</Text>
          <Button title="Back" variant="secondary" onPress={handleBack} />
        </View>
      </Screen>
    );
  }

  const displayTitle = customer?.name ?? job.title;
  const displayAddress = customer?.address ?? job.address;
  const displayCity = customer?.city ?? job.city;

  return (
    <Screen>
      <TopBar
        title={displayTitle}
        onBack={handleBack}
        onTitlePress={customer ? handleOpenCustomer : undefined}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Pressable onPress={handleOpenMaps} style={styles.mapPressable}>
          <View style={styles.mapPlaceholder}>
            <Ionicons name="location-outline" size={28} />
            <Text style={styles.mapTitle}>{displayAddress}</Text>
            <Text style={styles.mapSubtitle}>{displayCity} • Tap to open directions</Text>
          </View>
        </Pressable>

        <View style={styles.photosHeaderRow}>
          <View />
          <Pressable onPress={handleViewAllPhotos} hitSlop={10}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.photoRow}
        >
          {images.map(image => (
            <Pressable key={image.id} onPress={handleViewAllPhotos} style={styles.photoCard}>
              <Image source={{ uri: image.url }} style={styles.photoImage} />
            </Pressable>
          ))}
        </ScrollView>

        <Card style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusText}>
              <Text style={styles.statusLabel}>Status: </Text>
              {job.status}
            </Text>

            <Text style={styles.statusText}>
              <Text style={styles.statusLabel}>Schedule: </Text>
              {job.scheduledAt ?? 'Not scheduled'}
            </Text>
          </View>
        </Card>

        <Card style={styles.notesCard}>
          <Text style={styles.notesText}>{job.internalNotes ?? 'No notes yet.'}</Text>
          <Text style={styles.notesHint}>Internal only — customer cannot see this section.</Text>
        </Card>

        <View style={styles.messagesWrap}>
          {messages.map(message => {
            const isCustomer = message.sender === 'customer';

            return (
              <View
                key={message.id}
                style={[
                  styles.messageRow,
                  isCustomer ? styles.messageRowLeft : styles.messageRowRight,
                ]}
              >
                <View
                  style={[
                    styles.messageBubble,
                    isCustomer ? styles.messageBubbleCustomer : styles.messageBubbleCompany,
                  ]}
                >
                  <Text style={styles.messageText}>{message.body}</Text>
                  <Text style={styles.messageTime}>{formatMessageTime(message.sentAt)}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      <View style={styles.composerWrap}>
        <View style={styles.composerInner}>
          <TextInput
            value={draftMessage}
            onChangeText={setDraftMessage}
            placeholder="Type a message..."
            placeholderTextColor="rgba(0,0,0,0.4)"
            style={styles.composerInput}
            multiline
          />

          <Pressable
            onPress={handleSendMessage}
            style={[styles.sendButton, !draftMessage.trim() && styles.sendButtonDisabled]}
            disabled={!draftMessage.trim()}
          >
            <Ionicons name="arrow-up" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

function TopBar({
  title,
  onBack,
  onTitlePress,
}: {
  title: string;
  onBack: () => void;
  onTitlePress?: () => void;
}) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
        <Ionicons name="chevron-back" size={22} />
        <Text style={styles.backText}>Back</Text>
      </Pressable>

      {onTitlePress ? (
        <Pressable onPress={onTitlePress} hitSlop={10} style={styles.topTitlePressable}>
          <Text numberOfLines={1} style={[styles.topTitle, styles.topTitleLink]}>
            {title}
          </Text>
        </Pressable>
      ) : (
        <Text numberOfLines={1} style={styles.topTitle}>
          {title}
        </Text>
      )}

      <View style={styles.topBarSpacer} />
    </View>
  );
}

function formatMessageTime(sentAt: string) {
  const date = new Date(sentAt);

  if (Number.isNaN(date.getTime())) return sentAt;

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
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
  topTitlePressable: {
    flex: 1,
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  topTitleLink: {
    textDecorationLine: 'underline',
  },
  topBarSpacer: {
    width: 72,
  },

  mapPressable: {
    marginBottom: 14,
  },
  mapPlaceholder: {
    height: 190,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  mapTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  mapSubtitle: {
    marginTop: 6,
    fontSize: 13,
    textAlign: 'center',
    opacity: 0.65,
    fontWeight: '600',
  },

  photosHeaderRow: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    opacity: 0.7,
  },

  photoRow: {
    gap: 12,
    paddingRight: 2,
    marginBottom: 14,
  },
  photoCard: {
    width: 230,
    height: 155,
    borderRadius: 18,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },

  statusCard: {
    marginBottom: 14,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    flexWrap: 'wrap',
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
  },
  statusLabel: {
    fontWeight: '900',
  },

  notesCard: {
    marginBottom: 14,
  },
  notesText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
  notesHint: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '700',
    opacity: 0.55,
  },

  messagesWrap: {
    gap: 10,
  },
  messageRow: {
    flexDirection: 'row',
  },
  messageRowLeft: {
    justifyContent: 'flex-start',
  },
  messageRowRight: {
    justifyContent: 'flex-end',
  },
  messageBubble: {
    maxWidth: '82%',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  messageBubbleCustomer: {
    backgroundColor: '#DCEEFF',
  },
  messageBubbleCompany: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  messageText: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  messageTime: {
    marginTop: 6,
    fontSize: 11,
    fontWeight: '700',
    opacity: 0.55,
  },

  composerWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 16,
  },
  composerInner: {
    minHeight: 58,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#fff',
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  composerInput: {
    flex: 1,
    maxHeight: 100,
    fontSize: 15,
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 8,
  },
  sendButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.35,
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
