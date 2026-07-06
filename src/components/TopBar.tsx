import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Top bar: account + score (left) · date (true center) · bell + chat (far right).
 */
export default function TopBar({ score, dateLabel }: { score: number; dateLabel: string }) {
  return (
    <View style={styles.bar}>
      {/* Date pill — absolutely centered so side content can't push it off-center */}
      <View style={styles.dateWrap} pointerEvents="none">
        <View style={styles.datePill}>
          <Text style={styles.dateText}>{dateLabel}</Text>
        </View>
      </View>

      {/* Left: account + yomiscore */}
      <Pressable style={styles.avatar} accessibilityLabel="Account">
        <Feather name="user" size={16} color="#666" />
      </Pressable>
      <Pressable style={styles.score} accessibilityLabel="YomiScore">
        <Text style={styles.scoreText}>{score}</Text>
        <Feather name="star" size={14} color="#333" />
      </Pressable>

      <View style={styles.flex} />

      {/* Right: notifications, then chat at the far edge */}
      <Pressable style={styles.iconBtn} accessibilityLabel="Notifications">
        <Feather name="bell" size={20} color="#333" />
      </Pressable>
      <Pressable style={styles.iconBtn} accessibilityLabel="Friends chat">
        <Feather name="message-circle" size={20} color="#333" />
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
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
  dateText: { fontSize: 13, fontWeight: '600', color: '#111' },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  scoreText: { fontSize: 15, fontWeight: '700', color: '#111' },
  flex: { flex: 1 },
  iconBtn: { padding: 4 },
});
