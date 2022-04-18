import { IconButton } from 'components'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useContext } from 'react'
import Context from './Context'

interface HeaderProps {
  handleNext: () => void
  handleBack: () => void
}

export const Header = ({ handleNext, handleBack }: HeaderProps) => {
  const { currentTab } = useContext(Context)

  const nextButtonTitle = currentTab === 'form' ? 'Share' : 'Next'

  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <IconButton
          imgStyle={styles.backButton}
          icon={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back--v1.png' }}
          onPress={handleBack}
        />
      </View>

      {currentTab !== 'publish' && (
        <>
          <View style={styles.element}>
            <Text style={styles.text}>New Post</Text>
          </View>
          <View style={styles.element}>
            <TouchableOpacity onPress={handleNext}>
              <Text style={styles.nextButton}>{nextButtonTitle}</Text>
            </TouchableOpacity>
          </View>
        </>
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
  element: {
    flex: 1,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    alignSelf: 'center',
  },
  nextButton: {
    color: '#03a1fc',
    fontSize: 18,
    paddingHorizontal: 4,
    alignSelf: 'flex-end',
  },
})
