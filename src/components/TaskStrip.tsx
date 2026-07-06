import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, useTheme } from '../theme';

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
 * Google-Calendar-style stacked task rows on neutral surfaces.
 * Blue = interactive (expand control). Completed rows recede.
 */
export default function TaskStrip({ tasks }: { tasks: YomiTask[] }) {
  const t = useTheme();
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? tasks : tasks.slice(0, COLLAPSED_COUNT);
  const hasOverflow = tasks.length > COLLAPSED_COUNT;

  return (
    <View style={styles.wrap}>
      {visible.map((task) => (
        <Pressable
          key={task.id}
          style={[
            styles.row,
            task.size === 'small' ? styles.rowSmall : styles.rowBig,
            { backgroundColor: t.surface, borderColor: t.surfaceBorder },
            task.done && { opacity: 0.55 },
          ]}
        >
          <Text
            style={[styles.title, { color: t.text }, task.done && { color: t.textMuted, textDecorationLine: 'line-through' }]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          {task.time && <Text style={[styles.time, { color: t.textMuted }]}>{task.time}</Text>}
        </Pressable>
      ))}
      {hasOverflow && (
        <Pressable style={styles.chevron} onPress={() => setExpanded((e) => !e)} accessibilityLabel={expanded ? 'Show fewer tasks' : 'Show all tasks'}>
          <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={brand.blue} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 12, gap: 4 },
  row: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSmall: { height: 26 },
  rowBig: { height: 42 },
  title: { fontSize: 13, flex: 1 },
  time: { fontSize: 11, marginLeft: 8 },
  chevron: { alignItems: 'center', paddingVertical: 2 },
});
