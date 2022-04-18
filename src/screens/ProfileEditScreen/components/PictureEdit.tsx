import { ProfilePicture } from 'components'
import { db } from 'config'
import { useFilePicker } from 'hooks'
import { useUser } from 'providers'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { getErrorMessage } from 'utils'
import firebase from 'firebase/compat/app'

export const PictureEdit = () => {
  const { userInfo } = useUser()
  const handlePickImage = useFilePicker()

  const selectImage = async () => {
    try {
      const file = await handlePickImage()
      if (file?.cancelled) {
        return
      }

      db.collection('users')
      .doc(userInfo?.id)
      .update({
        profilePicture: 'data:image/jpeg;base64,' + file?.base64,
      })
    } catch (err) {
      alert(getErrorMessage(err))
    }
  }

  return (
    <View style={styles.container}>
      <ProfilePicture hideGradient diameter={110} imageUrl={userInfo?.profilePicture} />
      <TouchableOpacity onPress={selectImage}>
        <Text style={styles.button}>Change Profile Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    color: '#03a1fc',
    fontSize: 18,
    marginTop: 12,
  },
})
