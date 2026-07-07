import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#111' },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center' },
});
