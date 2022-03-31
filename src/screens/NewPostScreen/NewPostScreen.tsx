import { SafeAreaContainer } from 'components'
import { StyleSheet } from 'react-native'
import { AddPostForm } from './components/AddPostForm'
import { Header } from './components/Header'

export const NewPostScreen = () => {
  return (
    <SafeAreaContainer>
      <Header />
      <AddPostForm />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({})
