import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native"

export const SafeAreaContainer: React.FC = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      {children}
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