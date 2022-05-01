import { useNavigation } from '@react-navigation/native'
import { IconButton } from 'components'
import { StyleSheet, Text, View } from 'react-native'

interface HeaderProps {
  username?: string
}

export const Header = ({username}: HeaderProps) => {
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <View>
        <IconButton
          imgStyle={styles.backButton}
          icon={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back--v1.png' }}
          onPress={handleBack}
        />
      </View>
      <Text style={styles.username}>{username}</Text>
      <View style={styles.actions}>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    height: 30
  },
  backButton: {
    width: 30,
    height: 30,
  },
  username: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 40,
  },
  actions: {
  },
})
