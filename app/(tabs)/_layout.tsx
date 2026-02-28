import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* ✅ Tabs you want */}
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="calendar" options={{ title: "Calendar" }} />
      <Tabs.Screen name="inbox" options={{ title: "Messaging" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />

      {/* 🚫 Hide tabs you do NOT want (but files exist in app/(tabs)) */}
      {/* <Tabs.Screen name="customers" options={{ href: null }} />
      <Tabs.Screen name="jobs" options={{ href: null }} />
      <Tabs.Screen name="explore" options={{ href: null }} />
      <Tabs.Screen name="website" options={{ href: null }} /> */}
    </Tabs>
  );
}