import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native'

export const SafeAreaContainer: React.FC<any> = ({ children, style }) => {
  return <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
})
