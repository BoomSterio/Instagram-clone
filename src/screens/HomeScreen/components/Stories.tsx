import { USERS } from 'data'
import { ScrollView, Text, View } from 'react-native'
import { StoryItem } from './StoryItem'

export const Stories = () => {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((user) => (
          <StoryItem key={user.id} user={user} />
        ))}
      </ScrollView>
      <Text>Stories</Text>
    </View>
  )
}
