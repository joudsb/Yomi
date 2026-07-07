import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

export type TaskSize = 'small' | 'big' | 'event';

export interface YomiTask {
  id: string;
  title: string;
  time?: string; // ordered by time; manual order when no time
  size: TaskSize;
  done: boolean;
}

const COLLAPSED_COUNT = 3;

/**
 * Google-Calendar-style stacked task rows.
 * small task = thin row, big task / event = tall row.
 * (Colors per type come later — grayscale for now.)
 * Overflow: chevron expands to show all tasks.
 */
export default function TaskStrip({ tasks }: { tasks: YomiTask[] }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tasks : tasks.slice(0, COLLAPSED_COUNT);
  const hasOverflow = tasks.length > COLLAPSED_COUNT;

  return (
    <View style={styles.wrap}>
      {visible.map((t) => (
        <Pressable
          key={t.id}
          style={[styles.row, t.size === 'small' ? styles.rowSmall : styles.rowBig, t.done && styles.rowDone]}
        >
          <Text style={[styles.title, t.done && styles.titleDone]} numberOfLines={1}>
            {t.title}
          </Text>
          {t.time && <Text style={styles.time}>{t.time}</Text>}
        </Pressable>
      ))}
      {hasOverflow && (
        <Pressable style={styles.chevron} onPress={() => setExpanded((e) => !e)} accessibilityLabel={expanded ? 'Show fewer tasks' : 'Show all tasks'}>
          <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 12, gap: 4 },
  row: {
    borderWidth: 1,
    borderColor: '#bbb',
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSmall: { height: 26 },
  rowBig: { height: 42 },
  rowDone: { backgroundColor: '#ddd', borderColor: '#ccc' },
  title: { fontSize: 13, color: '#111', flex: 1 },
  titleDone: { color: '#888', textDecorationLine: 'line-through' },
  time: { fontSize: 11, color: '#777', marginLeft: 8 },
  chevron: { alignItems: 'center', paddingVertical: 2 },
});
