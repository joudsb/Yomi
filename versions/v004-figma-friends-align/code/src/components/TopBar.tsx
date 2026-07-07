import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, useTheme } from '../theme';

/**
 * Two-row header (Figma "Friends Align A"):
 *  Row 1 — avatar (yellow ring) + "<name>'s Yomi"  ·  bell + chat in rounded squares
 *  Row 2 — big date (left)  ·  YomiScore + star (right, brand yellow)
 */
export default function TopBar({
  name = 'Joudi',
  score,
  dateLabel,
  avatarUri,
}: {
  name?: string;
  score: number;
  dateLabel: string;
  avatarUri?: string;
}) {
  const t = useTheme();
  return (
    <View style={styles.bar}>
      {/* Row 1 */}
      <View style={styles.row}>
        <View style={styles.brandGroup}>
          <View style={[styles.avatar, { borderColor: brand.yellow, backgroundColor: t.surface }]}>
            {avatarUri ? (
              <Image source={{ uri: avatarUri }} style={styles.avatarImg} />
            ) : (
              <Feather name="user" size={16} color={t.textMuted} />
            )}
          </View>
          <Text style={[styles.brandText, { color: t.text }]} numberOfLines={1}>
            {name}&rsquo;s Yomi
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={[styles.iconSquare, { backgroundColor: t.surface }]} accessibilityLabel="Notifications">
            <Feather name="bell" size={18} color={t.icon} />
          </Pressable>
          <Pressable style={[styles.iconSquare, { backgroundColor: t.surface }]} accessibilityLabel="Friends chat">
            <Feather name="message-circle" size={18} color={t.icon} />
          </Pressable>
        </View>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <Text style={[styles.date, { color: t.text }]} numberOfLines={1}>
          {dateLabel}
        </Text>
        <Pressable style={styles.score} accessibilityLabel="YomiScore">
          <Text style={[styles.scoreText, { color: brand.yellow }]}>{score}</Text>
          <Feather name="star" size={18} color={brand.yellow} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4, gap: 20 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brandGroup: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: { width: '100%', height: '100%' },
  brandText: { fontSize: 16, fontWeight: '300', letterSpacing: -0.48 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconSquare: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: { fontSize: 32, fontWeight: '400', letterSpacing: -2 },
  score: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  scoreText: { fontSize: 24, fontWeight: '500', letterSpacing: -1.5 },
});
