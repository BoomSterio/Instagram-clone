import { Image, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Post } from 'types'

interface PostHeaderProps {
  username: string
  profileImageUrl: string
}

interface PostItemProps {
  post: Post
}

const PostHeader = ({ username, profileImageUrl }: PostHeaderProps) => {
  return (
    <View>
      <View>
        <Image source={{ uri: profileImageUrl }} />
        <Text>{username}</Text>
      </View>
      <Text>PostItem</Text>
    </View>
  )
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      <PostHeader username={post.username} profileImageUrl={post.profileImageUrl} />
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
  },
})
