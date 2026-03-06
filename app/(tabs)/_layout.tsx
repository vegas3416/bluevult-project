import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

import { FloatingActionMenu } from '../../src/ui/components/FloatingActionMenu';

export default function TabsLayout() {
  const router = useRouter();

  const [homeMenuOpen, setHomeMenuOpen] = useState(false);
  const [customerMenuOpen, setCustomerMenuOpen] = useState(false);

  const pathname = usePathname();

  const isHome = pathname === '/' || pathname === '/(tabs)' || pathname === '/(tabs)/index';
  const isCalendar = pathname === '/calendar' || pathname === '/(tabs)/calendar';
  const isInbox = pathname === '/inbox' || pathname === '/(tabs)/inbox';
  const isJobs = pathname === '/jobs' || pathname === '/(tabs)/jobs';
  const isCustomerDetail =
    pathname.startsWith('/customers/') || pathname.startsWith('/(tabs)/customers/');

  const homeActions = useMemo(
    () => [
      {
        key: 'camera',
        icon: 'camera-outline' as const,
        onPress: () => router.push('/(tabs)/capture'),
      },
      {
        key: 'message',
        icon: 'chatbubble-ellipses-outline' as const,
        onPress: () => router.push('/(tabs)/inbox'),
      },
      {
        key: 'job',
        icon: 'briefcase-outline' as const,
        onPress: () => router.push('/jobs/newjob'),
      },
      {
        key: 'calendar',
        icon: 'calendar-outline' as const,
        onPress: () => router.push('/(tabs)/calendar'),
      },
    ],
    [router],
  );

  const customerActions = useMemo(
    () => [
      {
        key: 'image',
        icon: 'camera-outline' as const,
        onPress: () => {
          Alert.alert('Add Image', 'Later this will add an image for this customer.');
        },
      },
      {
        key: 'job',
        icon: 'briefcase-outline' as const,
        onPress: () => router.push('/jobs/newjob'),
      },
      {
        key: 'calendar',
        icon: 'calendar-outline' as const,
        onPress: () => {
          Alert.alert(
            'Add Calendar Item',
            'Later this will create a calendar item tied to this customer.',
          );
        },
      },
    ],
    [router],
  );

  const closeMenus = () => {
    setHomeMenuOpen(false);
    setCustomerMenuOpen(false);
  };

  const handleCapturePress = () => {
    if (!isHome && !isCustomerDetail) {
      closeMenus();
    }

    if (isHome) {
      setCustomerMenuOpen(false);
      setHomeMenuOpen(prev => !prev);
      return;
    }

    if (isCustomerDetail) {
      setHomeMenuOpen(false);
      setCustomerMenuOpen(prev => !prev);
      return;
    }

    if (isCalendar) {
      Alert.alert('New Calendar Item', 'Later this will open the calendar input flow.');
      return;
    }

    if (isInbox) {
      Alert.alert(
        'New Message',
        'Later this will open the new message flow and ask who to message.',
      );
      return;
    }

    if (isJobs) {
      router.push('/jobs/newjob');
      return;
    }

    router.push('/(tabs)/capture');
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarActiveTintColor: '#7C3AED',
          tabBarInactiveTintColor: '#7A7A86',
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={22} />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: 'Calendar',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'calendar' : 'calendar-outline'} color={color} size={22} />
            ),
          }}
        />

        <Tabs.Screen
          name="capture"
          options={{
            title: '',
            tabBarIcon: () => null,
            tabBarButton: props => <CaptureTabButton {...props} onPress={handleCapturePress} />,
          }}
        />

        <Tabs.Screen
          name="inbox"
          options={{
            title: 'Inbox',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'mail' : 'mail-outline'} color={color} size={22} />
            ),
          }}
        />

        <Tabs.Screen
          name="jobs"
          options={{
            title: 'Jobs',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? 'briefcase' : 'briefcase-outline'}
                color={color}
                size={22}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="customers/[id]"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <FloatingActionMenu
        visible={homeMenuOpen}
        onClose={() => setHomeMenuOpen(false)}
        actions={homeActions}
        variant="home"
      />

      <FloatingActionMenu
        visible={customerMenuOpen}
        onClose={() => setCustomerMenuOpen(false)}
        actions={customerActions}
        variant="customer"
      />
    </>
  );
}

function CaptureTabButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.captureWrap}>
      <View style={styles.captureInner}>
        <Ionicons name="add" size={30} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    left: 18,
    right: 18,
    bottom: 0,
    height: 82,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },

  tabBarItem: {
    paddingTop: 8,
  },

  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
  },

  captureWrap: {
    top: -36,
    justifyContent: 'center',
    alignItems: 'center',
  },

  captureInner: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#7C3AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
