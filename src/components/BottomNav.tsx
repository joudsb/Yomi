import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { brand, useTheme } from '../theme';

export type TabKey = 'memories' | 'tasks' | 'home' | 'friends' | 'challenges';

const TABS: { key: TabKey; icon: keyof typeof Feather.glyphMap; label: string }[] = [
  { key: 'memories', icon: 'image', label: 'Memories' },
  { key: 'tasks', icon: 'check-square', label: 'Tasks' },
  { key: 'home', icon: 'zap', label: 'Home' },
  { key: 'friends', icon: 'users', label: 'Friends' },
  { key: 'challenges', icon: 'award', label: 'Challenges' },
];

/**
 * Floating glass pill — detached from the base, fully rounded ("welcoming").
 * Circular icon buttons; active tab sits on a brand-yellow circle.
 */
export default function BottomNav({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  const t = useTheme();
  return (
    <View style={styles.host} pointerEvents="box-none">
      <BlurView
        intensity={40}
        tint={t.dark ? 'dark' : 'light'}
        style={[styles.pill, { backgroundColor: t.glass, borderColor: t.glassBorder }]}
      >
        {TABS.map((tab) => {
          const isActive = tab.key === active;
          return (
            <Pressable
              key={tab.key}
              style={[styles.item, isActive && { backgroundColor: brand.yellow }]}
              onPress={() => onChange(tab.key)}
              accessibilityLabel={tab.label}
            >
              <Feather name={tab.icon} size={22} color={isActive ? t.onYellow : t.iconMuted} />
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    overflow: 'hidden',
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
