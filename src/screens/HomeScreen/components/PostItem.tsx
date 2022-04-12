import { postFooterIcons } from 'assets'
import { IconButton, ProfilePicture, TextInput } from 'components'
import { db } from 'config'
import moment from 'moment'
import { useUser } from 'providers'
import { useMemo } from 'react'
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements/dist/icons/Icon'
import { Comment, Post } from 'types'
import firebase from 'firebase/compat/app'
import { getErrorMessage } from 'utils'

interface PostHeaderProps {
  username: string
  profileImageUrl?: string
}

interface PostImageProps {
  imageUrl: string
}

interface PostFooterProps {
  id: string
  userId: string
  likesByUsers?: string[]
  topComments?: Comment[]
  username: string
  caption?: string
  commentsCount: number
  createdAt: Date
  profileImageUrl?: string
}

interface PostCommentProps {
  username: string
  caption?: string
}

interface PostCommentFieldProps {
  postId: string
  userId: string
  profileImageUrl?: string
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

const PostFooter = ({
  id,
  userId,
  likesByUsers,
  topComments = [],
  username,
  caption,
  commentsCount,
  createdAt,
  profileImageUrl,
}: PostFooterProps) => {
  const { userInfo } = useUser()

  const isLiked = useMemo(() => likesByUsers?.includes(userInfo?.id as string), [likesByUsers])

  const handleLike = () => {
    db.collection('users')
      .doc(userId)
      .collection('posts')
      .doc(id)
      .update({
        likesByUsers: !isLiked
          ? firebase.firestore.FieldValue.arrayUnion(userInfo?.id)
          : firebase.firestore.FieldValue.arrayRemove(userInfo?.id),
      })
      .then(() => console.log('Successfully changed like status'))
      .catch((err) => Alert.alert('Could not change like status', getErrorMessage(err)))
  }

  return (
    <View style={styles.postFooter}>
      <View style={styles.postFooterButtons}>
        <View style={styles.footerLeftButtons}>
          <IconButton
            icon={isLiked ? postFooterIcons.filledLike : postFooterIcons.like}
            imgStyle={styles.footerIcon}
            onPress={handleLike}
          />
          <IconButton icon={postFooterIcons.comment} imgStyle={styles.footerIcon} />
          <IconButton icon={postFooterIcons.share} imgStyle={styles.footerIcon} />
        </View>
        <View>
          <IconButton icon={postFooterIcons.save} imgStyle={styles.footerIcon} />
        </View>
      </View>

      <View style={{ marginLeft: 10 }}>
        {likesByUsers?.length != null ? (
          <Text style={{ color: 'white', fontWeight: '700', marginVertical: 4 }}>
            {likesByUsers.length.toLocaleString('en')} likes
          </Text>
        ) : null}
        <PostComment username={username} caption={caption} />
        {commentsCount && commentsCount > 0 ? (
          <TouchableOpacity style={{ marginTop: 4 }}>
            <Text style={{ color: 'grey' }}>
              View {commentsCount > 1 ? `all ${commentsCount} comments` : `${commentsCount} comment`}
            </Text>
          </TouchableOpacity>
        ) : null}
        {topComments?.length > 0
          ? topComments?.map(({ message, username: commentAuthor }, i) => (
              <PostComment key={i} caption={message} username={commentAuthor} />
            ))
          : null}
        <PostCommentField postId={id} userId={userId} profileImageUrl={profileImageUrl} />
        <Text style={styles.timeAgo}>{moment(createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

const PostCommentField = ({ postId, userId, profileImageUrl }: PostCommentFieldProps) => {
  return (
    <View style={styles.commentField}>
      <ProfilePicture hideGradient diameter={32} imageUrl={profileImageUrl} />
      <TextInput placeholder="Add a comment..." placeholderTextColor={'grey'} containerStyle={{ paddingVertical: 0 }} />
    </View>
  )
}

const PostComment = ({ username, caption }: PostCommentProps) => (
  <Text>
    <Text style={{ color: 'white', fontWeight: '700' }}>{username} </Text>
    <Text style={{ color: 'white' }}>{caption}</Text>
  </Text>
)

export const PostItem = ({
  post: { id, username, userId, profileImageUrl, imageUrl, caption, likesByUsers, comments, commentsCount, createdAt },
}: PostItemProps) => {
  return (
    <View>
      <PostHeader username={username} profileImageUrl={profileImageUrl} />
      <PostImage imageUrl={imageUrl} />
      <PostFooter
        id={id}
        userId={userId}
        profileImageUrl={profileImageUrl}
        likesByUsers={likesByUsers}
        topComments={comments}
        commentsCount={commentsCount}
        username={username}
        caption={caption}
        createdAt={createdAt}
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
    maxHeight: 450,
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
  commentField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 4,
  },
  timeAgo: {
    color: 'grey',
    fontSize: 9,
    marginTop: 4,
  },
})
