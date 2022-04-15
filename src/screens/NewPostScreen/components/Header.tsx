import { IconButton } from 'components'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from 'config'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import Context from './Context'

interface HeaderProps {
  handleNext: () => void
  handleBack: () => void
}

export const Header = ({handleNext, handleBack}: HeaderProps) => {
  const { currentTab } = useContext(Context)
  const navigation = useNavigation<NavigationProps>()

  return (
    <View style={styles.container}>
      <IconButton
        imgStyle={styles.backButton}
        icon={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back--v1.png' }}
        onPress={handleBack}
      />
      <Text style={styles.text}>New Post</Text>
      {currentTab !== 'publish' && (
        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      )}
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
    marginLeft: 16,
  },
  nextButton: {
    color: '#03a1fc',
    fontSize: 18,
    paddingHorizontal: 4,
  },
})
