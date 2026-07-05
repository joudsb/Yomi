import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopBar from '../components/TopBar';
import TaskStrip, { YomiTask } from '../components/TaskStrip';
import CameraSection from '../components/CameraSection';
import FriendsPostsRow, { FriendPreview } from '../components/FriendsPostsRow';

// Mock data — replaced by Firebase later
const MOCK_TASKS: YomiTask[] = [
  { id: '1', title: 'Morning run', time: '7:00', size: 'small', done: true },
  { id: '2', title: 'Study session — التعلم والحفظ', time: '9:00', size: 'big', done: false },
  { id: '3', title: 'Water the plants', size: 'small', done: false },
  { id: '4', title: 'Team meeting', time: '14:00', size: 'event', done: false },
  { id: '5', title: 'Read 20 pages', size: 'small', done: false },
];

const MOCK_FRIENDS: FriendPreview[] = [
  { id: 'a', name: 'Sara', hasNewPost: true },
  { id: 'b', name: 'Omar', hasNewPost: true },
  { id: 'c', name: 'Lina', hasNewPost: true },
  { id: 'd', name: 'Adam', hasNewPost: false },
  { id: 'e', name: 'Maya', hasNewPost: true },
];

function todayLabel() {
  return new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

/**
 * Quick Access — the page that opens every time the app launches.
 * Top → bottom: top bar, task strip, camera, capture buttons, friends' new posts.
 */
export default function HomeScreen({ onOpenFriends }: { onOpenFriends: () => void }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TopBar score={254} dateLabel={todayLabel()} />
      <TaskStrip tasks={MOCK_TASKS} />
      <View style={styles.spacer} />
      <CameraSection />
      <FriendsPostsRow friends={MOCK_FRIENDS} onPress={onOpenFriends} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  content: { paddingBottom: 8 },
  spacer: { height: 10 },
});
