import { ProfilePicture } from 'components'
import { StyleSheet, Text, View } from 'react-native'
import { User } from 'types'

const STORY_WIDTH = 76

interface StoryItemProps {
  user: User
}

export const StoryItem = ({ user }: StoryItemProps) => {
  return (
    <View key={user.id} style={styles.userStory}>
      <ProfilePicture imageUrl={user.image} diameter={STORY_WIDTH} />
      <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
        {user.username}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  userStory: {
    width: STORY_WIDTH,
    marginLeft: 8,
    alignItems: 'center',
  },
  userName: {
    color: 'white',
    fontSize: 12,
    marginTop: 2
  },
})
