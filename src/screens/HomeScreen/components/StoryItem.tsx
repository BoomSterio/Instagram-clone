import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, View } from 'react-native';
import { User } from 'types';

const STORY_WIDTH = 76;

interface StoryProps {
  user: User;
}

export const StoryItem = ({ user }: StoryProps) => {
  return (
    <View key={user.id} style={styles.userStory}>
      <LinearGradient
        colors={['#CA1D7E', '#E35157', '#F2703F']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.userImageGradient}
      >
        <Image source={{ uri: user.image }} style={styles.userImage} />
      </LinearGradient>
      <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
        {user.username}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  userStory: {
    width: STORY_WIDTH,
    marginLeft: 6,
    alignItems: 'center',
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  userImageGradient: {
    height: STORY_WIDTH,
    width: STORY_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: STORY_WIDTH / 2,
  },
  userName: {
    color: 'white',
  },
});
