import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, useTheme } from '../theme';

/**
 * Top bar: account + score (left) · date (true center) · bell + chat (far right).
 * Brand yellow appears only on the score star — a small daily celebration.
 */
export default function TopBar({ score, dateLabel }: { score: number; dateLabel: string }) {
  const t = useTheme();
  return (
    <View style={styles.bar}>
      <View style={styles.dateWrap} pointerEvents="none">
        <View style={[styles.datePill, { borderColor: t.surfaceBorder, backgroundColor: t.surface }]}>
          <Text style={[styles.dateText, { color: t.text }]}>{dateLabel}</Text>
        </View>
      </View>

      <Pressable style={[styles.avatar, { borderColor: t.iconMuted }]} accessibilityLabel="Account">
        <Feather name="user" size={16} color={t.textMuted} />
      </Pressable>
      <Pressable style={styles.score} accessibilityLabel="YomiScore">
        <Text style={[styles.scoreText, { color: t.text }]}>{score}</Text>
        <Feather name="star" size={14} color={brand.yellow} />
      </Pressable>

      <View style={styles.flex} />

      <Pressable style={styles.iconBtn} accessibilityLabel="Notifications">
        <Feather name="bell" size={20} color={t.icon} />
      </Pressable>
      <Pressable style={styles.iconBtn} accessibilityLabel="Friends chat">
        <Feather name="message-circle" size={20} color={t.icon} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  dateWrap: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePill: {
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  dateText: { fontSize: 13, fontWeight: '600' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  scoreText: { fontSize: 15, fontWeight: '700' },
  flex: { flex: 1 },
  iconBtn: { padding: 4 },
});
