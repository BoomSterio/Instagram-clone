import { SafeAreaContainer } from 'components'
import { StyleSheet } from 'react-native'
import { AddPostForm } from './components/CaptionForm'
import { NewPostWizzard } from './components/NewPostWizzard'

export const NewPostScreen = () => {
  return (
    <SafeAreaContainer>
      <NewPostWizzard />
    </SafeAreaContainer>
  )
}

const styles = StyleSheet.create({})
