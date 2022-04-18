import { Navbar, SafeAreaContainer } from 'components'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Header } from './components/Header'
import { PictureEdit } from './components/PictureEdit'

export const ProfileEditScreen = () => {
  return (
    <SafeAreaContainer>
      <Header />
      <Divider width={1} orientation={'vertical'} color='grey' />
      <ScrollView>
        <PictureEdit />
      </ScrollView>
      <Navbar />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({
})