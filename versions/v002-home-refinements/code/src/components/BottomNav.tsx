import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type TabKey = 'memories' | 'tasks' | 'home' | 'friends' | 'challenges';

const TABS: { key: TabKey; icon: keyof typeof Feather.glyphMap; label: string }[] = [
  { key: 'memories', icon: 'image', label: 'Memories' },
  { key: 'tasks', icon: 'check-square', label: 'Tasks' },
  { key: 'home', icon: 'zap', label: 'Home' },
  { key: 'friends', icon: 'users', label: 'Friends' },
  { key: 'challenges', icon: 'award', label: 'Challenges' },
];

export default function BottomNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <View style={styles.bar}>
      {TABS.map((t) => {
        const isActive = t.key === active;
        return (
          <Pressable key={t.key} style={styles.item} onPress={() => onChange(t.key)} accessibilityLabel={t.label}>
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              <Feather name={t.icon} size={22} color={isActive ? '#111' : '#999'} />
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{t.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 4,
  },
  item: { flex: 1, alignItems: 'center', gap: 2 },
  iconWrap: { padding: 4, borderRadius: 10 },
  iconWrapActive: { backgroundColor: '#eee' },
  label: { fontSize: 10, color: '#999' },
  labelActive: { color: '#111', fontWeight: '600' },
});
