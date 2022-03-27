import { ProfilePicture } from 'components'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Post } from 'types'

interface PostHeaderProps {
  username: string
  profileImageUrl: string
}

interface PostImageProps {
  imageUrl: string
}

interface PostItemProps {
  post: Post
}

const PostHeader = ({ username, profileImageUrl }: PostHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.userInfo}>
        <ProfilePicture diameter={35} imageUrl={profileImageUrl} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <TouchableOpacity>
        <Icon name="more-vert" color="white" />
      </TouchableOpacity>
    </View>
  )
}

const PostImage = ({ imageUrl }: PostImageProps) => (
  <View style={styles.postImageWrapper}>
    <Image style={styles.postImage} source={{ uri: imageUrl }} />
  </View>
)

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      <PostHeader username={post.username} profileImageUrl={post.profileImageUrl} />
      <PostImage imageUrl={post.imageUrl} />
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    color: 'white',
    marginLeft: 6,
    fontWeight: '700',
  },
  postImageWrapper: {
    height: 450,
    width: '100%',
  },
  postImage: {
    height: '100%',
    resizeMode: 'cover',
  },
})
