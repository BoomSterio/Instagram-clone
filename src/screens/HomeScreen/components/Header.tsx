import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { HeaderLogo } from 'assets'
import { IconButton } from 'components'

export const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image style={styles.logo} source={HeaderLogo} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <IconButton
          icon={'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'}
          imgStyle={styles.icon}
        />
        <IconButton
          icon={'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}
          imgStyle={styles.icon}
        />
        <TouchableOpacity>
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeNumber}>25</Text>
          </View>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png',
            }}
          />
        </TouchableOpacity>
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
  unreadBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    left: 20,
    bottom: 18,
    width: 26,
    height: 19,
    borderRadius: 25,
    backgroundColor: '#FF3250',
  },
  unreadBadgeNumber: {
    color: 'white',
    fontWeight: '600',
  },
})
