import { POSTS } from 'data'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import { db } from '../../../../firebase'
import { PostItem } from './PostItem'

export const Posts = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    db.collectionGroup('posts').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  return (
    <View>
      <Divider width={1} orientation={'vertical'} />
      {POSTS.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </View>
  )
}
