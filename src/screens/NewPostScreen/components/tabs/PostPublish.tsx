import { useNavigation } from '@react-navigation/native'
import { db } from 'config'
import moment from 'moment'
import { useUser } from 'providers'
import { useContext, useEffect } from 'react'
import Context from '../Context'
import { getErrorMessage } from 'utils'
import { StyleSheet, Text, View } from 'react-native'
import { LinearProgress } from 'react-native-elements'

export const PostPublish = () => {
  const { formState } = useContext(Context)
  const { userAuth, userInfo } = useUser()
  const navigation = useNavigation()

  useEffect(() => {
    const uploadPost = async () => {
      try {
        await db.collection('users').doc(userAuth?.uid).collection('posts').add({
          userId: userAuth?.uid,
          imageUrl: formState.image,
          caption: formState.caption,
          profileImageUrl: userInfo?.profilePicture,
          likes: 0,
          commentsCount: 0,
          likesByUsers: [],
          username: userInfo?.username,
          createdAt: moment().toISOString(),
        })
        navigation.goBack()
      } catch (error) {
        alert(getErrorMessage(error))
      }
    }
    uploadPost()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Uploading your post...'}</Text>
      <LinearProgress color={'#03a1fc'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  text: {
    color: '#03a1fc',
    fontSize: 18,
    padding: 8,
  },
})
