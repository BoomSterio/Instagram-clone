import { SafeAreaView, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native'
import { Header } from './components/Header'
import { Posts } from './components/Posts'
import { Stories } from './components/Stories'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Stories />
        <Posts />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
