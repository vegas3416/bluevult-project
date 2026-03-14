import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Screen } from '../../../ui/components/Screen';

type NewCustomerScreenProps = {
  onClose: () => void;
};

export function NewCustomerScreen({ onClose }: NewCustomerScreenProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Missing name', 'Please enter a customer name.');
      return;
    }

    // Later: save to backend / store
    Alert.alert(
      'Customer created',
      'Later this will save the customer and continue into the next step.',
      [
        {
          text: 'OK',
          onPress: onClose,
        },
      ],
    );
  };

  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8, paddingTop: 16 }}>
        <Text style={styles.topTitle}>New Customer</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionCard}>
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
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Input label="City" value={city} onChangeText={setCity} placeholder="Austin" />
            </View>

            <View style={{ flex: 1 }}>
              <Input label="State" value={state} onChangeText={setState} placeholder="TX" />
            </View>
          </View>

          <Input
            label="Notes"
            value={notes}
            onChangeText={setNotes}
            placeholder="Anything important to know?"
            multiline
          />
        </View>
      </ScrollView>

      {/*  Later: add best method to contact customer (phone, email, text, etc) but
      will need to see if companies want to have that feature. */}
      <View style={styles.buttonSpacing}>
        <Button title="Save Customer" onPress={handleSave} />
        <View style={{ height: 12 }} />
        <Button title="Cancel" variant="secondary" onPress={onClose} />
      </View>
    </Screen>
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
    marginTop: 8,
    paddingBottom: 16,
  },
  topTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  buttonSpacing: {
    paddingHorizontal: 18,
  },

  sectionCard: {
    padding: 18,
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
