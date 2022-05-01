import { db } from "config"
import { useEffect, useState } from "react"
import { Post, User } from "types"
import { UserInfo } from "./UserInfo"
import { Animated, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { ProfilePicture } from "components"
import { Posts } from "./Posts"

interface ProfileProps {
  userInfo: User | null
}

interface PreviewModalProps {
  post?: Post
  preview: PreviewState
}

const PreviewModal = ({ post, preview }: PreviewModalProps) => {
  const modalStyle = {
    opacity: preview.visible,
    transform: [
      {
        translateY: preview.visible.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ],
  }

  if (!post) return null

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.modal, modalStyle]} pointerEvents="none">
      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <ProfilePicture imageUrl={post.profileImageUrl} diameter={35}/>
          <View style={{marginLeft: 8}}>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={{color: '#fff', fontSize: 12}}>Location</Text>
          </View>
        </View>
        <Image source={{ uri: post.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Text style={styles.text}>{post.caption}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

export interface PreviewState {
  post?: Post
  selected?: string
  visible: any
}

export const Profile = ({userInfo}: ProfileProps) => {
  const [preview, setPreview] = useState<PreviewState>({
    post: undefined,
    selected: undefined,
    visible: new Animated.Value(0),
  })

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserInfo userInfo={userInfo} />
      <Posts userId={userInfo?.id} preview={preview} setPreview={setPreview} />
      <PreviewModal post={preview.post} preview={preview}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 600,
    marginVertical: 4,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '70%',
    marginBottom: 50
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    overflow: 'hidden',
    padding: 8,
  },
  username: {
    color: 'white',
    fontWeight: '700',
  },
  footer: {
    backgroundColor: '#000',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    overflow: 'hidden',
    maxHeight: 50,
    padding: 8,
  },
  footerContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    color: '#fff'
  },
})