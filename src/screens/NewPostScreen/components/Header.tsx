import { IconButton } from 'components'
import { StyleSheet, Text, View } from 'react-native'

export const Header = () => {
  return (
    <View style={styles.container}>
      <IconButton
        imgStyle={styles.backButton}
        icon={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back--v1.png' }}
      />
      <Text style={styles.text}>New Post</Text>
      <View></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginRight: 24,
  },
})
