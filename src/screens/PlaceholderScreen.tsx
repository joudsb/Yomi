import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

export default function PlaceholderScreen({ title, subtitle }: { title: string; subtitle: string }) {
  const t = useTheme();
  return (
    <View style={styles.wrap}>
      <Text style={[styles.title, { color: t.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: t.textMuted }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  title: { fontSize: 22, fontWeight: '700' },
  subtitle: { fontSize: 14, textAlign: 'center' },
});
