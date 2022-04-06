import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaContainer } from 'components'
import { LogoColoredIcon } from 'assets'
import { StatusBar } from 'expo-status-bar'
import { SignUpForm } from './components/SignUpForm'

export const SignUpScreen = () => {
  return (
    <SafeAreaContainer style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.logoWrapper}>
        <Image style={styles.logo} source={LogoColoredIcon} />
      </View>
      <SignUpForm />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 12,
  },
  logoWrapper: {
    alignItems: 'center',
    marginVertical: 60,
  },
  logo: {
    width: 90,
    height: 90,
  },
})
