import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';

export function NewCustomerScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) return router.back();
    return router.replace('/(tabs)');
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a customer name.');
      return;
    }

    Alert.alert(
      'Customer created',
      'Later this will save the customer and continue into the next step.',
      [{ text: 'OK', onPress: handleBack }],
    );
  };

  return (
    <Screen>
      <TopBar title="New Customer" onBack={handleBack} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Card style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Customer Info</Text>

          <Input label="Name" value={name} onChangeText={setName} placeholder="Customer name" />
          <Input label="Phone" value={phone} onChangeText={setPhone} placeholder="(555) 555-5555" />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="customer@email.com"
          />
          <Input
            label="Address"
            value={address}
            onChangeText={setAddress}
            placeholder="123 Main St"
          />
          <Input label="City" value={city} onChangeText={setCity} placeholder="Austin" />
          <Input
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="Anything important to know?"
            multiline
          />
        </Card>

        <View style={{ height: 16 }} />

        <Button title="Save Customer" onPress={handleSave} />
        <View style={{ height: 12 }} />
        <Button title="Cancel" variant="secondary" onPress={handleBack} />

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

function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(0,0,0,0.4)"
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMultiline]}
      />
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
  },

  inputWrap: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: '500',
    backgroundColor: '#fff',
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
});
