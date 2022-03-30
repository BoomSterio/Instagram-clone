import { SafeAreaContainer } from 'components'
import { StyleSheet } from 'react-native'
import { AddNewPost } from './components/AddNewPost'
import { Header } from './components/Header'

export const NewPostScreen = () => {
  return (
    <SafeAreaContainer>
      <Header />
      <AddNewPost />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({})