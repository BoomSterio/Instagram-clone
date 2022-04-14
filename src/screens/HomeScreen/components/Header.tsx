import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderLogo } from 'assets'
import { auth } from 'config'
import { getErrorMessage } from 'utils'
import { IconButton } from 'components'

const handleSignOut = async () => {
  try {
    auth.signOut()
    console.log('Signed out successfully!')
  } catch (error) {
    Alert.alert('Could not sign out', getErrorMessage(error))
  }
}

export const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSignOut}>
        <Image style={styles.logo} source={HeaderLogo} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <IconButton
          icon="https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png"
          imgStyle={styles.icon}
          badgeNumber={2}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
})
