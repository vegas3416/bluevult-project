import { Ionicons } from '@expo/vector-icons';
import { Tabs, usePathname, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { FloatingActionMenu } from '../../src/ui/components/FloatingActionMenu';

export default function TabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === '/';

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

  const handleCapturePress = () => {
    if (isHome) {
      setMenuOpen(prev => !prev);
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
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        actions={homeActions}
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
