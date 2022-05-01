import { GridIcon, ListIcon } from 'assets'
import { PostItem } from 'components'
import { useCallback, useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Post } from 'types'
import { PostPreview } from './PostPreview'
import { PreviewState } from './Profile'

interface PostsProps {
  posts: Post[]
  preview: PreviewState
  setPreview: React.Dispatch<React.SetStateAction<PreviewState>>
}

enum Tabs {
  grid = 'grid',
  list = 'list',
}

export const Posts = ({ posts, preview, setPreview }: PostsProps) => {
  const [tab, setTab] = useState<Tabs>(Tabs.grid)

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
  }, [tab])

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
