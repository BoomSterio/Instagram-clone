import 'intl'
import 'intl/locale-data/jsonp/en'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import LocaleProvider from './src/providers/Locale'
import { Auth } from 'providers'

export default function App() {
  return (
    <LocaleProvider>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Auth />
      </View>
    </LocaleProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
