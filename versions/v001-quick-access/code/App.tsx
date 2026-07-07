import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import BottomNav, { TabKey } from './src/components/BottomNav';
import HomeScreen from './src/screens/HomeScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen';

export default function App() {
  const [tab, setTab] = useState<TabKey>('home');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <StatusBar style="dark" />
        <View style={styles.content}>
          {tab === 'home' && <HomeScreen onOpenFriends={() => setTab('friends')} />}
          {tab === 'memories' && <PlaceholderScreen title="Memories" subtitle="Albums, calendar view of past posts & memories" />}
          {tab === 'tasks' && <PlaceholderScreen title="Tasks" subtitle="Full task list: today, upcoming, goals" />}
          {tab === 'friends' && <PlaceholderScreen title="Friends" subtitle="Friends' posts feed + chat" />}
          {tab === 'challenges' && <PlaceholderScreen title="Group Challenges" subtitle="Challenges with friends" />}
        </View>
        <BottomNav active={tab} onChange={setTab} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#ffffff' },
  content: { flex: 1 },
});
