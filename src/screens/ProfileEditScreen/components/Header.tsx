import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.element}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.backButton}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.element}>
        <Text style={styles.text}>Edit Profile</Text>
      </View>
      <View style={styles.element}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.nextButton}>Done</Text>
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
    margin: 10,
  },
  element: {
    flex: 1,
  },
  backButton: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 4,
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
