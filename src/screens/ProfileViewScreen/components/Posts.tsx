import { GridIcon, ListIcon } from 'assets'
import { PostItem } from 'components'
import { db } from 'config'
import { useCallback, useEffect, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Post } from 'types'
import { PostPreview } from './PostPreview'
import { PreviewState } from './Profile'

interface PostsProps {
  userId?: string
  preview: PreviewState
  setPreview: React.Dispatch<React.SetStateAction<PreviewState>>
}

enum Tabs {
  grid = 'grid',
  list = 'list',
}

export const Posts = ({ userId, preview, setPreview }: PostsProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.grid)
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (!userId) {
      return
    }
    const fetchPosts = async () => {
      const snapshot = await db.collection('users')
        .doc(userId)
        .collection('posts')
        .orderBy("createdAt", "desc")
        .get()

      const newPosts = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})) as Post[]
      setPosts(newPosts)
    }
    fetchPosts()
  }, [userId])

  const renderPosts = useCallback(() => {
    switch (tab) {
      case Tabs.grid: {
        return (
          <View style={styles.grid}>
            {posts.map((post) => (
              <PostPreview key={post.id} post={post} preview={preview} setPreview={setPreview} />
            ))}
          </View>
        )
      }
      case Tabs.list: {
        return (
          posts.map(post => (
            <PostItem key={post.id} post={post} />
          ))
        )
      }
    }
  }, [tab, posts])

  return (
    <>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab(Tabs.grid)} style={[styles.tab, tab === Tabs.grid && styles.activeTab]}>
          <Image style={styles.icon} source={GridIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab(Tabs.list)} style={[styles.tab, tab === Tabs.list && styles.activeTab]}>
          <Image style={styles.icon} source={ListIcon} />
        </TouchableOpacity>
      </View>
      {renderPosts()}
    </>
  )
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  activeTab: {
    borderRadius: 4,
    borderBottomWidth: 4,
    borderBottomColor: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  grid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
})
