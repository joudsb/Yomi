import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { brand, useTheme } from '../theme';

export interface FriendPreview {
  id: string;
  name: string;
  hasNewPost: boolean;
}

const MAX_SHOWN = 4;

/**
 * Compact, button-like pill of overlapping friend avatars (friends with new posts).
 * No names. Centered. Pressing opens the Friends page.
 */
export default function FriendsPostsRow({ friends, onPress }: { friends: FriendPreview[]; onPress: () => void }) {
  const t = useTheme();
  const withPosts = friends.filter((f) => f.hasNewPost).slice(0, MAX_SHOWN);
  return (
    <View style={styles.wrap}>
      <Pressable
        style={[styles.pill, { backgroundColor: t.surface, borderColor: t.surfaceBorder }]}
        onPress={onPress}
        accessibilityLabel="See friends' latest posts"
      >
        {withPosts.map((f, i) => (
          <View key={f.id} style={[styles.avatar, { backgroundColor: t.surfaceBorder, borderColor: t.bg }, i > 0 && styles.overlap]}>
            <Feather name="user" size={16} color={t.textMuted} />
          </View>
        ))}
        <Feather name="chevron-right" size={18} color={brand.blue} style={styles.chevron} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 4 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlap: { marginLeft: -12 },
  chevron: { marginLeft: 4 },
});
