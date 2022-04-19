import { USERS } from 'data'
import { ScrollView, View } from 'react-native'
import { StoryItem } from './StoryItem'

export const Stories = () => {
  return (
    <View style={{ marginVertical: 8 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {USERS.map((user) => (
          <StoryItem key={user.id} user={user} />
        ))}
      </ScrollView>
    </View>
  )
}
