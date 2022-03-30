import { POSTS } from 'data'
import { View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { PostItem } from './PostItem'

export const Posts = () => {
  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      {POSTS.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </View>
  )
}
