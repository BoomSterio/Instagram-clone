import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, View } from 'react-native'
import { Post } from 'types'
import { PreviewState } from './Profile'

interface PostPreviewProps {
  post: Post
  preview: PreviewState
  setPreview: React.Dispatch<React.SetStateAction<PreviewState>>
}

export const PostPreview = ({ post, preview, setPreview }: PostPreviewProps) => {
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, gestureState) => {
      Animated.spring(preview.visible, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start()
    },
    onPanResponderStart: (e, gestureState) => {
      setPreview(prev => ({
        ...prev,
        post
      }))
    },
    onPanResponderMove: (e, gestureState) => {
      const { pageX, pageY } = e.nativeEvent
      
    },
    onPanResponderRelease: (e, gestureState) => {
      Animated.timing(preview.visible, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        if (preview.selected) {
          alert(`You released on ${preview.selected}!`)
        }
        setPreview((state) => ({
          ...state,
          selected: undefined,
        }))
      })
    },
  })

  const { width, height } = Dimensions.get('window')

  return (
    <View style={{ width: width / 3, height: width / 3, padding: 1 }}>
      <Image style={{ flex: 1 }} source={{ uri: post.imageUrl }} {...panResponder.panHandlers} />
    </View>
  )
}

const styles = StyleSheet.create({
  
})
