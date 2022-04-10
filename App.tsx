import 'intl'
import 'intl/locale-data/jsonp/en'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import LocaleProvider from './src/providers/Locale'
import { Auth } from 'providers'
import UserProvider from 'providers/User'

export default function App() {
  return (
    <UserProvider>
      <LocaleProvider>
        <View style={styles.container}>
          <StatusBar style="light" />
          <Auth />
        </View>
      </LocaleProvider>
    </UserProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
