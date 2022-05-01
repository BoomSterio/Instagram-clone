import { postFooterIcons } from 'assets'
import { IconButton, ProfilePicture, TextInput } from 'components'
import { db } from 'config'
import moment from 'moment'
import { useUser } from 'providers'
import { useMemo, useState } from 'react'
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
  comments?: Comment[]
  username: string
  caption?: string
  createdAt: Date
}

interface PostCommentProps {
  username: string
  caption?: string
}

interface PostCommentFieldProps {
  postId: string
  userId: string
  profilePicture?: string
  commentAuthor?: string
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

const PostFooter = ({ id, userId, likesByUsers, comments = [], username, caption, createdAt }: PostFooterProps) => {
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
        {comments?.length && comments.length > 0 ? (
          <TouchableOpacity style={{ marginTop: 4 }}>
            <Text style={{ color: 'grey' }}>
              View {comments.length > 1 ? `all ${comments.length} comments` : `${comments.length} comment`}
            </Text>
          </TouchableOpacity>
        ) : null}
        {comments?.length > 0
          ? comments
              ?.slice(0, 2)
              .map(({ message, username: commentAuthor }, i) => (
                <PostComment key={i} caption={message} username={commentAuthor} />
              ))
          : null}
        <PostCommentField
          postId={id}
          userId={userId}
          profilePicture={userInfo?.profilePicture}
          commentAuthor={userInfo?.username}
        />
        <Text style={styles.timeAgo}>{moment(createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

const PostCommentField = ({ postId, userId, profilePicture, commentAuthor }: PostCommentFieldProps) => {
  const [message, setMessage] = useState('')

  const handleComment = () => {
    const comment: Comment = {
      userId,
      message,
      username: commentAuthor || userId,
      likesByUsers: [],
    }

    db.collection('users')
      .doc(userId)
      .collection('posts')
      .doc(postId)
      .update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment),
      })
      .then(() => {
        console.log('Comment was sent')
        setMessage('')
      })
      .catch((err) => Alert.alert('Could not sent comment', getErrorMessage(err)))
  }

  return (
    <View style={styles.commentField}>
      <ProfilePicture hideGradient diameter={32} imageUrl={profilePicture} />
      <TextInput
        value={message}
        onChangeText={setMessage}
        onSubmitEditing={handleComment}
        placeholder="Add a comment..."
        placeholderTextColor={'grey'}
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        multiline
        maxLength={150}
        style={{ color: 'white', alignSelf: 'stretch' }}
        containerStyle={{ paddingVertical: 0 }}
      />
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
  post: { id, username, userId, profileImageUrl, imageUrl, caption, likesByUsers, comments, createdAt },
}: PostItemProps) => {
  return (
    <View>
      <PostHeader username={username} profileImageUrl={profileImageUrl} />
      <PostImage imageUrl={imageUrl} />
      <PostFooter
        id={id}
        userId={userId}
        likesByUsers={likesByUsers}
        comments={comments}
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
    width: '90%',
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
