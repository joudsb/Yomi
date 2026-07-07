import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export interface FriendPreview {
  id: string;
  name: string;
  hasNewPost: boolean;
}

/**
 * Row of friends' profile pictures who have new posts.
 * Pressing takes the user to the Friends page (all friends' posts).
 */
export default function FriendsPostsRow({ friends, onPress }: { friends: FriendPreview[]; onPress: () => void }) {
  const withPosts = friends.filter((f) => f.hasNewPost);
  return (
    <Pressable style={styles.wrap} onPress={onPress} accessibilityLabel="See friends' latest posts">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {withPosts.map((f) => (
          <View key={f.id} style={styles.friend}>
            <View style={styles.avatarRing}>
              <View style={styles.avatar}>
                <Feather name="user" size={18} color="#777" />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {f.name}
            </Text>
          </View>
        ))}
        <View style={styles.more}>
          <Feather name="chevron-right" size={18} color="#888" />
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: 4 },
  list: { paddingHorizontal: 16, alignItems: 'center', gap: 14 },
  friend: { alignItems: 'center', width: 52 },
  avatarRing: {
    padding: 2,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#555', // "new post" indicator ring
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e3e3e3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 10, color: '#555', marginTop: 3 },
  more: { justifyContent: 'center' },
});
