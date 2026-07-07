import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../theme';

export type TaskSize = 'small' | 'big' | 'event';

export interface YomiTask {
  id: string;
  title: string;
  time?: string; // ordered by time; manual order when no time
  size: TaskSize;
  done: boolean;
}

const COLLAPSED_COUNT = 3;

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

/**
 * Task card (Figma "Friends Align A"): stacked calendar-style rows on a single
 * card surface. A "N more" pill expands/collapses the full list. Tapping a row
 * toggles done; completed rows recede.
 */
export default function TaskStrip({ tasks }: { tasks: YomiTask[] }) {
  const t = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>(
    () => Object.fromEntries(tasks.map((task) => [task.id, task.done]))
  );

  const visible = expanded ? tasks : tasks.slice(0, COLLAPSED_COUNT);
  const overflow = tasks.length - COLLAPSED_COUNT;
  const hasOverflow = overflow > 0;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((e) => !e);
  };

  const toggleDone = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));

  return (
    <View style={[styles.card, { backgroundColor: t.surface, borderColor: t.surfaceBorder }]}>
      {visible.map((task) => {
        const isDone = done[task.id];
        return (
          <Pressable
            key={task.id}
            onPress={() => toggleDone(task.id)}
            style={[
              styles.row,
              task.size === 'big' ? styles.rowBig : styles.rowSmall,
              { backgroundColor: t.dark ? '#222' : '#EDEDF0' },
              isDone && styles.rowDone,
            ]}
          >
            <View style={styles.left}>
              <Feather
                name={isDone ? 'check-circle' : 'circle'}
                size={14}
                color={isDone ? t.textMuted : t.icon}
              />
              <Text
                style={[styles.title, { color: t.text }, isDone && { color: t.textMuted, textDecorationLine: 'line-through' }]}
                numberOfLines={1}
              >
                {task.title}
              </Text>
            </View>
            {task.time && <Text style={[styles.time, { color: t.textMuted }]}>{task.time}</Text>}
          </Pressable>
        );
      })}

      {hasOverflow && (
        <View style={styles.moreWrap}>
          <Pressable
            style={styles.morePill}
            onPress={toggleExpand}
            accessibilityLabel={expanded ? 'Show fewer tasks' : `Show ${overflow} more tasks`}
          >
            <Text style={[styles.moreText, { color: t.textMuted }]}>
              {expanded ? 'Show less' : `${overflow} more`}
            </Text>
            <Feather name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={t.textMuted} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    padding: 8,
    gap: 4,
  },
  row: {
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowSmall: { height: 30 },
  rowBig: { height: 42 },
  rowDone: { opacity: 0.5 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  title: { fontSize: 13, flex: 1 },
  time: { fontSize: 11, marginLeft: 8 },
  moreWrap: { alignItems: 'center', paddingTop: 2 },
  morePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingLeft: 12,
    paddingRight: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  moreText: { fontSize: 12 },
});
