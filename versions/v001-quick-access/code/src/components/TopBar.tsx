import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

/**
 * Top bar — layout not final (per wireframe notes).
 * Must include: friends chat, friends (view all / invite), date, yomiscore (streak).
 */
export default function TopBar({ score, dateLabel }: { score: number; dateLabel: string }) {
  return (
    <View style={styles.bar}>
      {/* Account */}
      <Pressable style={styles.avatar} accessibilityLabel="Account">
        <Feather name="user" size={16} color="#666" />
      </Pressable>

      {/* Friends: view all + invite */}
      <Pressable style={styles.iconBtn} accessibilityLabel="Friends / add friends">
        <Feather name="user-plus" size={18} color="#333" />
      </Pressable>

      {/* Friends chat */}
      <Pressable style={styles.iconBtn} accessibilityLabel="Friends chat">
        <Feather name="message-circle" size={18} color="#333" />
      </Pressable>

      {/* Date pill (center) */}
      <View style={styles.datePill}>
        <Text style={styles.dateText}>{dateLabel}</Text>
      </View>

      {/* YomiScore */}
      <Pressable style={styles.score} accessibilityLabel="YomiScore">
        <Text style={styles.scoreText}>{score}</Text>
        <Feather name="star" size={14} color="#333" />
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
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#999',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtn: { padding: 4 },
  datePill: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 999,
    paddingVertical: 5,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  dateText: { fontSize: 13, fontWeight: '600', color: '#111' },
  score: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  scoreText: { fontSize: 15, fontWeight: '700', color: '#111' },
});
