// src/features/jobs/screens/NewJobScreen.tsx
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';

import { Button } from '../../../ui/components/Button';
import { Card } from '../../../ui/components/Card';
import { Screen } from '../../../ui/components/Screen';
import { SectionHeader } from '../../../ui/components/SectionHeader';

type JobType = 'Install' | 'Service' | 'Quote' | 'Follow-up';

type Customer = {
  id: string;
  name: string;
  city: string;
  address?: string;
};

type NewJobDraft = {
  // Step 1 (customer)
  customerMode: 'existing' | 'new';
  customerId?: string;
  customerName?: string;
  customerCity?: string;

  // Step 2 (job basics)
  jobType?: JobType;
  address?: string;
  notes?: string;

  // Step 3 (schedule)
  scheduled: boolean;
  date?: string; // placeholder "2026-03-01"
  time?: string; // placeholder "3:00 PM"
  durationMins?: number;
};

function useColors() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return {
    bg: isDark ? '#0B0B0F' : '#FFFFFF',
    text: isDark ? '#EAF1FF' : '#111111',
    subtext: isDark ? '#A9B6CC' : '#555555',
    muted: isDark ? '#8EA0BA' : '#777777',
    border: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.08)',
    chipBg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    chipActiveBg: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)',
  };
}

function StepPill({ label, active }: { label: string; active: boolean }) {
  const c = useColors();
  return (
    <View
      style={[
        styles.stepPill,
        {
          backgroundColor: active ? c.chipActiveBg : c.chipBg,
          borderColor: c.border,
        },
      ]}
    >
      <Text style={{ color: c.text, fontWeight: '800', fontSize: 12 }}>{label}</Text>
    </View>
  );
}

function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? c.chipActiveBg : c.chipBg,
          borderColor: c.border,
        },
      ]}
    >
      <Text style={{ color: c.text, fontWeight: '800' }}>{label}</Text>
    </Pressable>
  );
}

function RowLabel({ title, subtitle }: { title: string; subtitle?: string }) {
  const c = useColors();
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ color: c.text, fontSize: 16, fontWeight: '900' }}>{title}</Text>
      {subtitle ? (
        <Text style={{ color: c.subtext, marginTop: 4, fontWeight: '600' }}>{subtitle}</Text>
      ) : null}
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
  onChangeText: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const c = useColors();
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={{ color: c.muted, fontWeight: '800', marginBottom: 6 }}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={c.muted}
        style={[
          styles.input,
          {
            color: c.text,
            borderColor: c.border,
            backgroundColor: c.chipBg,
            height: multiline ? 92 : 46,
            textAlignVertical: multiline ? 'top' : 'center',
          },
        ]}
        multiline={multiline}
      />
    </View>
  );
}

export function NewJobScreen() {
  const router = useRouter();
  const c = useColors();

  const [step, setStep] = useState<0 | 1 | 2>(0);

  const [customerSearch, setCustomerSearch] = useState('');

  // Placeholder data
  const customers: Customer[] = useMemo(
    () => [
      { id: 'c1', name: 'Mike R.', city: 'Round Rock', address: '123 Oak St' },
      { id: 'c2', name: 'Ashley C.', city: 'Austin', address: '88 Barton Rd' },
      { id: 'c3', name: 'Brandon K.', city: 'Cedar Park' },
    ],
    [],
  );

  const [draft, setDraft] = useState<NewJobDraft>({
    customerMode: 'existing',
    scheduled: false,
    durationMins: 90,
  });

  const filteredCustomers = useMemo(() => {
    const q = customerSearch.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      x =>
        x.name.toLowerCase().includes(q) ||
        x.city.toLowerCase().includes(q) ||
        (x.address?.toLowerCase().includes(q) ?? false),
    );
  }, [customers, customerSearch]);

  function setDraftPatch(patch: Partial<NewJobDraft>) {
    setDraft(prev => ({ ...prev, ...patch }));
  }

  function canGoNext(): { ok: boolean; message?: string } {
    if (step === 0) {
      if (draft.customerMode === 'existing') {
        if (!draft.customerId) return { ok: false, message: 'Pick an existing customer.' };
      } else {
        if (!draft.customerName?.trim()) return { ok: false, message: 'Enter customer name.' };
        if (!draft.customerCity?.trim()) return { ok: false, message: 'Enter customer city.' };
      }
      return { ok: true };
    }

    if (step === 1) {
      if (!draft.jobType) return { ok: false, message: 'Select a job type.' };
      if (!draft.address?.trim()) return { ok: false, message: 'Enter an address.' };
      return { ok: true };
    }

    // step 2 (schedule) is optional unless scheduled=true
    if (step === 2) {
      if (draft.scheduled) {
        if (!draft.date?.trim()) return { ok: false, message: 'Enter a date.' };
        if (!draft.time?.trim()) return { ok: false, message: 'Enter a time.' };
      }
      return { ok: true };
    }

    return { ok: true };
  }

  function onNext() {
    const check = canGoNext();
    if (!check.ok) {
      Alert.alert('Missing info', check.message ?? 'Please complete this step.');
      return;
    }
    setStep(s => (s === 2 ? 2 : ((s + 1) as any)));
  }

  function onBack() {
    if (step === 0) {
      router.back();
      return;
    }
    setStep(s => (s - 1) as any);
  }

  function onCreate() {
    const check = canGoNext();
    if (!check.ok) {
      Alert.alert('Missing info', check.message ?? 'Please complete this step.');
      return;
    }

    // Placeholder “create” action
    const payload = {
      id: `job_${Math.floor(Math.random() * 1_000_000)}`,
      ...draft,
      createdAt: new Date().toISOString(),
    };

    Alert.alert('Job created (placeholder)', JSON.stringify(payload, null, 2), [
      {
        text: 'View Jobs',
        onPress: () => router.replace('/jobs'),
      },
      {
        text: 'Go Home',
        onPress: () => router.replace('/(tabs)'),
      },
      { text: 'OK' },
    ]);
  }

  // Auto-fill address if choosing an existing customer and they have address
  function selectCustomer(cust: Customer) {
    setDraftPatch({
      customerMode: 'existing',
      customerId: cust.id,
      // also store customer name/city for preview convenience (optional)
      customerName: cust.name,
      customerCity: cust.city,
      address: cust.address ?? draft.address ?? '',
    });
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={[styles.title, { color: c.text }]}>New Job</Text>
        <Text style={[styles.subtitle, { color: c.subtext }]}>
          Step-by-step flow (placeholder data)
        </Text>

        <View style={styles.stepsRow}>
          <StepPill label="1 • Customer" active={step === 0} />
          <StepPill label="2 • Details" active={step === 1} />
          <StepPill label="3 • Schedule" active={step === 2} />
        </View>
      </View>

      {step === 0 ? (
        <>
          <SectionHeader title="Customer" />
          <Card>
            <RowLabel
              title="Who is this for?"
              subtitle="Choose an existing customer or add a new one."
            />

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
              <Chip
                label="Existing"
                active={draft.customerMode === 'existing'}
                onPress={() => setDraftPatch({ customerMode: 'existing' })}
              />
              <Chip
                label="New"
                active={draft.customerMode === 'new'}
                onPress={() =>
                  setDraftPatch({
                    customerMode: 'new',
                    customerId: undefined,
                  })
                }
              />
            </View>

            {draft.customerMode === 'existing' ? (
              <>
                <Input
                  label="Search customers"
                  value={customerSearch}
                  onChangeText={setCustomerSearch}
                  placeholder="Type a name or city..."
                />

                <View style={{ gap: 10 }}>
                  {filteredCustomers.map(cust => {
                    const active = draft.customerId === cust.id;
                    return (
                      <Pressable
                        key={cust.id}
                        onPress={() => selectCustomer(cust)}
                        style={[
                          styles.pickRow,
                          {
                            borderColor: c.border,
                            backgroundColor: active ? c.chipActiveBg : c.chipBg,
                          },
                        ]}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={{ color: c.text, fontWeight: '900' }}>{cust.name}</Text>
                          <Text style={{ color: c.muted, fontWeight: '700', marginTop: 2 }}>
                            {cust.city}
                            {cust.address ? ` • ${cust.address}` : ''}
                          </Text>
                        </View>
                        <Text style={{ color: c.muted, fontWeight: '900' }}>
                          {active ? '✓' : ''}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </>
            ) : (
              <>
                <Input
                  label="Customer name"
                  value={draft.customerName ?? ''}
                  onChangeText={v => setDraftPatch({ customerName: v })}
                  placeholder="e.g. John Smith"
                />
                <Input
                  label="City"
                  value={draft.customerCity ?? ''}
                  onChangeText={v => setDraftPatch({ customerCity: v })}
                  placeholder="e.g. Pflugerville"
                />
              </>
            )}
          </Card>
        </>
      ) : null}

      {step === 1 ? (
        <>
          <SectionHeader title="Job Details" />
          <Card>
            <RowLabel
              title="What kind of job is it?"
              subtitle="Pick a job type and add the basics."
            />

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              {(['Install', 'Service', 'Quote', 'Follow-up'] as JobType[]).map(t => (
                <Chip
                  key={t}
                  label={t}
                  active={draft.jobType === t}
                  onPress={() => setDraftPatch({ jobType: t })}
                />
              ))}
            </View>

            <Input
              label="Address"
              value={draft.address ?? ''}
              onChangeText={v => setDraftPatch({ address: v })}
              placeholder="Street address (placeholder)"
            />

            <Input
              label="Notes"
              value={draft.notes ?? ''}
              onChangeText={v => setDraftPatch({ notes: v })}
              placeholder="Anything important for the crew?"
              multiline
            />
          </Card>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <SectionHeader title="Schedule" />
          <Card>
            <RowLabel
              title="Schedule now?"
              subtitle="You can leave it unscheduled and set the time later."
            />

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 12 }}>
              <Chip
                label="Not scheduled"
                active={!draft.scheduled}
                onPress={() => setDraftPatch({ scheduled: false })}
              />
              <Chip
                label="Schedule"
                active={draft.scheduled}
                onPress={() => setDraftPatch({ scheduled: true })}
              />
            </View>

            {draft.scheduled ? (
              <>
                <Input
                  label="Date"
                  value={draft.date ?? ''}
                  onChangeText={v => setDraftPatch({ date: v })}
                  placeholder="YYYY-MM-DD (placeholder)"
                />
                <Input
                  label="Time"
                  value={draft.time ?? ''}
                  onChangeText={v => setDraftPatch({ time: v })}
                  placeholder="e.g. 3:00 PM"
                />
                <Input
                  label="Duration (minutes)"
                  value={String(draft.durationMins ?? 90)}
                  onChangeText={v =>
                    setDraftPatch({ durationMins: Number(v.replace(/[^\d]/g, '')) || 0 })
                  }
                  placeholder="e.g. 90"
                />
              </>
            ) : (
              <Text style={{ color: c.muted, fontWeight: '700' }}>
                No schedule set. This job will still appear in Jobs; you can schedule later.
              </Text>
            )}
          </Card>

          <SectionHeader title="Preview" />
          <Card>
            <Text style={{ color: c.text, fontWeight: '900', marginBottom: 6 }}>
              {draft.customerName ?? '(customer)'}
              {draft.customerCity ? ` • ${draft.customerCity}` : ''}
            </Text>
            <Text style={{ color: c.muted, fontWeight: '700', marginBottom: 6 }}>
              {draft.jobType ?? '(job type)'} • {draft.address ?? '(address)'}
            </Text>
            <Text style={{ color: c.muted, fontWeight: '700' }}>
              {draft.scheduled
                ? `Scheduled: ${draft.date ?? ''} at ${draft.time ?? ''} (${draft.durationMins ?? 0}m)`
                : 'Unscheduled'}
            </Text>
          </Card>
        </>
      ) : null}

      <View style={{ height: 14 }} />

      {/* Bottom action bar */}
      <View style={[styles.bottomBar, { borderColor: c.border, backgroundColor: c.bg }]}>
        <Button title={step === 0 ? 'Cancel' : 'Back'} variant="secondary" onPress={onBack} />
        {step < 2 ? (
          <Button title="Next" onPress={onNext} />
        ) : (
          <Button title="Create Job" onPress={onCreate} />
        )}
      </View>

      <View style={{ height: 18 }} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { marginTop: 6, fontSize: 14, fontWeight: '600' },

  stepsRow: { flexDirection: 'row', gap: 10, marginTop: 12 },

  stepPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
  },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontWeight: '700',
  },

  pickRow: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  bottomBar: {
    marginTop: 12,
    borderTopWidth: 1,
    paddingTop: 12,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});
