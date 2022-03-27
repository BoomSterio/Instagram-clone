import { postFooterIcons } from 'assets'
import { IconButton, ProfilePicture } from 'components'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Comment, Post } from 'types'

interface PostHeaderProps {
  username: string
  profileImageUrl: string
}

interface PostImageProps {
  imageUrl: string
}

interface PostFooterProps {
  likesCount?: number
  topComments: Comment[]
  username: string
  caption?: string
  commentsCount: number
}

interface PostCommentProps {
  username: string
  caption?: string
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

const PostFooter = ({ likesCount, topComments, username, caption, commentsCount }: PostFooterProps) => {
  return (
    <View style={styles.postFooter}>
      <View style={styles.postFooterButtons}>
        <View style={styles.footerLeftButtons}>
          <IconButton icon={postFooterIcons.like} imgStyle={styles.footerIcon} />
          <IconButton icon={postFooterIcons.comment} imgStyle={styles.footerIcon} />
          <IconButton icon={postFooterIcons.share} imgStyle={styles.footerIcon} />
        </View>
        <View>
          <IconButton icon={postFooterIcons.save} imgStyle={styles.footerIcon} />
        </View>
      </View>

      <View style={{ marginLeft: 10 }}>
        {likesCount && <Text style={{ color: 'white', fontWeight: '700', marginTop: 4 }}>{likesCount} likes</Text>}
        <PostComment username={username} caption={caption} />
        {topComments?.length && (
          <>
            <TouchableOpacity>
              <Text style={{ color: 'grey' }}>View all {commentsCount} comments</Text>
            </TouchableOpacity>
            {topComments.map(({message, username: commentAuthor}) => (
              <PostComment caption={message} username={commentAuthor} />
            ))}
          </>
        )}
      </View>
    </View>
  )
}

const PostComment = ({ username, caption }: PostCommentProps) => (
  <Text style={{ marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '700' }}>{username} </Text>
    <Text style={{ color: 'white' }}>{caption}</Text>
  </Text>
)

export const PostItem = ({
  post: { username, profileImageUrl, imageUrl, caption, likes, comments, commentsCount },
}: PostItemProps) => {
  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      <PostHeader username={username} profileImageUrl={profileImageUrl} />
      <PostImage imageUrl={imageUrl} />
      <PostFooter
        likesCount={likes}
        topComments={comments}
        commentsCount={commentsCount}
        username={username}
        caption={caption}
      />
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
  postFooter: {
    marginVertical: 10,
  },
  postFooterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerLeftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerIcon: {
    width: 26,
    height: 26,
    marginHorizontal: 10,
  },
})
