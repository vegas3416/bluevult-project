import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';

type CustomerListItem = {
  id: string;
  name: string;
  jobsLabel: string;
  lastUpdated: string;
  imageUrl?: string;
};

export function CustomersListScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const customers = useMemo<CustomerListItem[]>(
    () => [
      {
        id: '1',
        name: 'Mike Rodriguez',
        jobsLabel: '2 open jobs',
        lastUpdated: '2h ago',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=60',
      },
      {
        id: '2',
        name: 'Ashley Carter',
        jobsLabel: 'Quote follow-up',
        lastUpdated: 'Yesterday',
        imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=60',
      },
      {
        id: '3',
        name: 'Brandon King',
        jobsLabel: 'No active jobs',
        lastUpdated: '3d ago',
      },
      {
        id: '4',
        name: 'Danielle Smith',
        jobsLabel: '1 scheduled job',
        lastUpdated: 'Mar 10',
      },
    ],
    [],
  );

  const filteredCustomers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;

    return customers.filter(customer => customer.name.toLowerCase().includes(q));
  }, [customers, query]);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Customers</Text>
          <Text style={styles.subtitle}>{filteredCustomers.length} total</Text>
        </View>

        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color="#6B7280" />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search customers..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />

          {!!query && (
            <Pressable onPress={() => setQuery('')} hitSlop={10}>
              <Text style={styles.clearText}>✕</Text>
            </Pressable>
          )}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredCustomers.map(customer => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onPress={() => router.push(`/customers/${customer.id}`)}
            />
          ))}

          {filteredCustomers.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No customers found</Text>
              <Text style={styles.emptySubtitle}>Try searching by a different name.</Text>
            </View>
          ) : null}
        </ScrollView>
      </View>
    </Screen>
  );
}

function CustomerRow({ customer, onPress }: { customer: CustomerListItem; onPress: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.rowCard}>
        <View style={styles.rowInner}>
          <View style={styles.avatarWrap}>
            {customer.imageUrl ? (
              <Image source={{ uri: customer.imageUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarInitials}>MR</Text>
              </View>
            )}
          </View>

          <View style={styles.mainContent}>
            <Text numberOfLines={1} style={styles.customerName}>
              {customer.name}
            </Text>
            <Text numberOfLines={1} style={styles.jobsLabel}>
              {customer.jobsLabel}
            </Text>
          </View>

          <View style={styles.metaRight}>
            <Text style={styles.updatedText}>{customer.lastUpdated}</Text>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
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
    gap: 10,
  },

  rowCard: {
    padding: 12,
  },

  rowInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatarWrap: {
    marginRight: 12,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 14,
  },

  avatarFallback: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarInitials: {
    fontSize: 18,
    fontWeight: '800',
    color: '#374151',
    letterSpacing: 0.5,
  },

  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },

  customerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111111',
  },

  jobsLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
  },

  metaRight: {
    marginLeft: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
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
