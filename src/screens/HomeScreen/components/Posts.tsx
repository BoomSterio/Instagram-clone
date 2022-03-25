import { POSTS } from 'data'
import { ScrollView, StyleSheet } from 'react-native'
import { PostItem } from './PostItem'

export const Posts = () => {
  return (
    <ScrollView>
      {POSTS.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
