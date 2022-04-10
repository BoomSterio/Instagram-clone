import { POSTS } from 'data'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { Post } from 'types'
import { db } from '../../../../firebase'
import { PostItem } from './PostItem'

export const Posts = () => {
  const [data, setData] = useState<Post[]>([])

  useEffect(() => {
    return db.collectionGroup('posts').onSnapshot((snapshot) => {
      const posts: Post[] = snapshot.docs.map((doc) => {
        const { userId, caption, imageUrl, username, likes, likesByUsers, comments, commentsCount, profileImageUrl } =
          doc.data()
        return {
          id: doc.id,
          userId,
          caption,
          imageUrl,
          username,
          likes,
          likesByUsers,
          comments,
          commentsCount,
          profileImageUrl,
        }
      })
      setData(posts)
    })
  }, [])

  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      {data.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </View>
  )
}
